import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

// Path to the data directory
const DATA_DIR = path.join(process.cwd(), 'data');

// Load all corpus files on server start (cached in memory)
const corpusCache: Record<string, any> = {};

function loadCorpora() {
  const files = ['ohada', 'ecowas', 'eac', 'sadc'];
  for (const file of files) {
    try {
      const filePath = path.join(DATA_DIR, `${file}-corpus.json`);
      const data = JSON.parse(readFileSync(filePath, 'utf-8'));
      corpusCache[file.toUpperCase()] = data;
    } catch (error) {
      console.warn(`Could not load ${file}-corpus.json:`, error);
    }
  }
}

// Load corpora at server start
loadCorpora();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jurisdiction = searchParams.get('jurisdiction')?.toUpperCase();
  const keyword = searchParams.get('keyword')?.toLowerCase();
  const type = searchParams.get('type')?.toLowerCase();

  // If jurisdiction is provided, only search that corpus
  if (jurisdiction) {
    const corpus = corpusCache[jurisdiction];
    if (!corpus) {
      return NextResponse.json(
        { error: `Jurisdiction '${jurisdiction}' not found` },
        { status: 404 }
      );
    }
    return searchCorpus(corpus, keyword, type);
  }

  // Search all corpora
  const results: Record<string, any> = {};
  for (const [jur, corpus] of Object.entries(corpusCache)) {
    const hits = searchCorpus(corpus, keyword, type);
    if (hits.documents.length > 0) {
      results[jur] = hits;
    }
  }
  return NextResponse.json(results);
}

function searchCorpus(corpus: any, keyword?: string, type?: string) {
  let documents = corpus.documents || [];

  if (keyword) {
    documents = documents.filter((doc: any) => {
      const titleMatch = doc.title?.toLowerCase().includes(keyword);
      const summaryMatch = doc.summary?.toLowerCase().includes(keyword);
      const keywordMatch = doc.keywords?.some((k: string) =>
        k.toLowerCase().includes(keyword)
      );
      return titleMatch || summaryMatch || keywordMatch;
    });
  }

  if (type) {
    documents = documents.filter(
      (doc: any) => doc.type?.toLowerCase() === type
    );
  }

  return {
    jurisdiction: corpus.jurisdiction,
    count: documents.length,
    documents,
  };
}

export async function POST(request: NextRequest) {
  // Allow POST requests with JSON body for more complex searches
  const body = await request.json();
  const { jurisdiction, keyword, type } = body;

  const jur = jurisdiction?.toUpperCase();
  const kw = keyword?.toLowerCase();
  const t = type?.toLowerCase();

  if (jur) {
    const corpus = corpusCache[jur];
    if (!corpus) {
      return NextResponse.json(
        { error: `Jurisdiction '${jur}' not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(searchCorpus(corpus, kw, t));
  }

  const results: Record<string, any> = {};
  for (const [jur, corpus] of Object.entries(corpusCache)) {
    const hits = searchCorpus(corpus, kw, t);
    if (hits.documents.length > 0) {
      results[jur] = hits;
    }
  }
  return NextResponse.json(results);
}
