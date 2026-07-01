#!/usr/bin/env python3
"""
Open Legal Corpus - Search Tool
--------------------------------
Search the OHADA legal corpus by keyword, jurisdiction, or document type.

Usage:
    python scripts/search_corpus.py --jurisdiction OHADA --keyword arbitration
    python scripts/search_corpus.py --jurisdiction OHADA --type "Uniform Act"
"""

import json
import argparse
import sys
from pathlib import Path

# Default path to the data directory
DATA_DIR = Path(__file__).parent.parent / "data"


def load_corpus(jurisdiction: str):
    """
    Load the corpus file for a given jurisdiction.
    """
    filename = f"{jurisdiction.lower()}-corpus.json"
    filepath = DATA_DIR / filename

    if not filepath.exists():
        print(f"Error: Jurisdiction '{jurisdiction}' not found.")
        print(f"Expected file: {filename}")
        print("Available jurisdictions:")
        for f in DATA_DIR.glob("*-corpus.json"):
            print(f"  - {f.stem.replace('-corpus', '').upper()}")
        sys.exit(1)

    with open(filepath, "r", encoding="utf-8") as f:
        corpus = json.load(f)
    
    return corpus


def search_corpus(jurisdiction: str, keyword: str = None, doc_type: str = None):
    """
    Search the corpus by keyword and/or document type.
    """
    corpus = load_corpus(jurisdiction)
    results = []

    for doc in corpus.get("documents", []):
        match = True

        if keyword:
            keyword_lower = keyword.lower()
            # Search in title, summary, and keywords
            title_match = keyword_lower in doc.get("title", "").lower()
            summary_match = keyword_lower in doc.get("summary", "").lower()
            keyword_match = any(
                keyword_lower in kw.lower() for kw in doc.get("keywords", [])
            )
            if not (title_match or summary_match or keyword_match):
                match = False

        if doc_type:
            # Match document type exactly (case insensitive)
            if doc.get("type", "").lower() != doc_type.lower():
                match = False

        if match:
            results.append(doc)

    return results


def format_results(results, jurisdiction: str):
    """
    Pretty-print search results.
    """
    if not results:
        print(f"No documents found for the given search criteria in {jurisdiction}.")
        return

    print(f"\nFound {len(results)} document(s) in {jurisdiction}:\n")
    for i, doc in enumerate(results, 1):
        print(f"{i}. {doc.get('title')}")
        print(f"   ID: {doc.get('id')}")
        print(f"   Type: {doc.get('type')} ({doc.get('year')})")
        print(f"   Summary: {doc.get('summary')}")
        print(f"   Keywords: {', '.join(doc.get('keywords', []))}")
        print(f"   Source: {doc.get('source_url')}")
        print(f"   Citation: {doc.get('citation_format')}")
        print()


def main():
    parser = argparse.ArgumentParser(
        description="Search the Open Legal Corpus by jurisdiction and keyword."
    )
    parser.add_argument(
        "--jurisdiction",
        type=str,
        default="OHADA",
        help="Jurisdiction to search (e.g., OHADA, ECOWAS, EAC)",
    )
    parser.add_argument(
        "--keyword",
        type=str,
        help="Keyword or phrase to search for (e.g., arbitration, companies, insurance)",
    )
    parser.add_argument(
        "--type",
        dest="doc_type",
        type=str,
        help="Filter by document type (e.g., Uniform Act, Treaty, Statute)",
    )

    args = parser.parse_args()

    results = search_corpus(
        jurisdiction=args.jurisdiction,
        keyword=args.keyword,
        doc_type=args.doc_type,
    )

    format_results(results, args.jurisdiction)


if __name__ == "__main__":
    main()
