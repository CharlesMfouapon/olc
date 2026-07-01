'use client'

import { useState, useEffect } from 'react'
import { Search, FileText, Scale, Globe, BookOpen, ArrowRight, Loader2 } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [jurisdiction, setJurisdiction] = useState('all')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim() && jurisdiction === 'all') return
    setLoading(true)
    setHasSearched(true)

    try {
      const params = new URLSearchParams()
      if (query.trim()) params.set('keyword', query.trim())
      if (jurisdiction !== 'all') params.set('jurisdiction', jurisdiction)
      
      const res = await fetch(`/api/search?${params.toString()}`)
      const data = await res.json()
      setResults(data)
    } catch (e) {
      setResults({ error: 'Search failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const getJurisdictionColor = (jur: string) => {
    const colors: Record<string, string> = {
      OHADA: 'bg-[#006b3f] text-white',
      ECOWAS: 'bg-[#d4a017] text-black',
      EAC: 'bg-[#1a5c9e] text-white',
      SADC: 'bg-[#991b1b] text-white',
    }
    return colors[jur] || 'bg-gray-700 text-white'
  }

  const getJurisdictionFlag = (jur: string) => {
    const flags: Record<string, string> = {
      OHADA: '🌍',
      ECOWAS: '🌍',
      EAC: '🌍',
      SADC: '🌍',
    }
    return flags[jur] || '🌍'
  }

  return (
    <div className="min-h-screen bg-[#0c0a0a] text-[#f5f0eb] font-sans">
      {/* Header */}
      <header className="border-b border-[#2a2826]/40 py-6 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#006b3f] flex items-center justify-center text-white font-bold text-sm">
              OLC
            </div>
            <h1 className="text-lg font-serif tracking-tight">Open Legal Corpus</h1>
          </div>
          <span className="text-xs text-[#8f8a86] font-mono border border-[#2a2826]/40 px-3 py-1 rounded-full">
            v1.0 · OHADA · ECOWAS · EAC · SADC
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-20">
        
        {/* Hero */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#006b3f]/10 border border-[#006b3f]/30 px-4 py-1.5 rounded-full text-xs font-mono text-[#006b3f]">
            <Scale size={14} /> Pan-African Legal Infrastructure
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#f5f0eb] leading-tight">
            Search the <span className="text-[#d4a017]">African</span> Legal Corpus
          </h2>
          <p className="text-[#8f8a86] max-w-2xl mx-auto text-lg">
            Query the foundational texts of OHADA, ECOWAS, EAC, and SADC.
            Structured. Curated. Open.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8f8a86] w-4 h-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for legal concepts, keywords, or jurisdictions..."
                className="w-full pl-11 pr-4 py-3.5 bg-[#181514] border border-[#2a2826]/40 rounded-xl text-[#f5f0eb] placeholder:text-[#8f8a86]/50 focus:outline-none focus:border-[#d4a017]/50 transition-colors"
              />
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8f8a86] w-4 h-4" />
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="pl-10 pr-8 py-3.5 bg-[#181514] border border-[#2a2826]/40 rounded-xl text-[#f5f0eb] appearance-none focus:outline-none focus:border-[#d4a017]/50 transition-colors cursor-pointer"
              >
                <option value="all">All Jurisdictions</option>
                <option value="OHADA">OHADA</option>
                <option value="ECOWAS">ECOWAS</option>
                <option value="EAC">EAC</option>
                <option value="SADC">SADC</option>
              </select>
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#d4a017] text-[#0c0a0a] hover:bg-[#c49a3f] px-6 py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-w-[100px]"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <><Search size={18} /> Search</>}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center text-xs text-[#8f8a86]">
            <span>Try:</span>
            <button onClick={() => { setQuery('arbitration'); setJurisdiction('all'); handleSearch(); }} className="hover:text-[#f5f0eb] underline underline-offset-2 decoration-[#2a2826] transition-colors">
              arbitration
            </button>
            <span>·</span>
            <button onClick={() => { setQuery('free movement'); setJurisdiction('ECOWAS'); handleSearch(); }} className="hover:text-[#f5f0eb] underline underline-offset-2 decoration-[#2a2826] transition-colors">
              ECOWAS free movement
            </button>
            <span>·</span>
            <button onClick={() => { setQuery('company'); setJurisdiction('OHADA'); handleSearch(); }} className="hover:text-[#f5f0eb] underline underline-offset-2 decoration-[#2a2826] transition-colors">
              OHADA company law
            </button>
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="mt-12 space-y-8">
            {loading ? (
              <div className="text-center py-12 text-[#8f8a86]">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#d4a017]" />
                <p>Searching the corpus...</p>
              </div>
            ) : results?.error ? (
              <div className="bg-[#f85149]/10 border border-[#f85149]/30 rounded-xl p-6 text-center text-[#f85149]">
                <p>{results.error}</p>
              </div>
            ) : Object.keys(results).length === 0 ? (
              <div className="text-center py-12 space-y-2 border-t border-[#2a2826]/40">
                <BookOpen className="w-12 h-12 text-[#2a2826] mx-auto" />
                <p className="text-[#8f8a86]">No documents found.</p>
                <p className="text-xs text-[#8f8a86]/60">Try a different keyword or jurisdiction.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Results Header */}
                <div className="flex items-center justify-between border-b border-[#2a2826]/40 pb-4">
                  <h3 className="text-lg font-serif text-[#f5f0eb]">
                    {Object.values(results).reduce((sum: number, r: any) => sum + r.count, 0)} results
                  </h3>
                  <span className="text-xs text-[#8f8a86] font-mono">
                    {Object.keys(results).length} jurisdiction{Object.keys(results).length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Results List */}
                {Object.entries(results).map(([jur, data]: [string, any]) => (
                  <div key={jur} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getJurisdictionFlag(jur)}</span>
                      <span className={`text-xs font-mono px-3 py-1 rounded-full ${getJurisdictionColor(jur)}`}>
                        {jur}
                      </span>
                      <span className="text-xs text-[#8f8a86] ml-auto">
                        {data.count} document{data.count > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {data.documents.map((doc: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-[#181514] border border-[#2a2826]/40 rounded-xl p-5 hover:border-[#d4a017]/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <h4 className="text-[#f5f0eb] font-medium">{doc.title}</h4>
                              <div className="flex flex-wrap gap-2 text-xs">
                                <span className="flex items-center gap-1 text-[#8f8a86]">
                                  <FileText size={12} /> {doc.type}
                                </span>
                                <span className="text-[#8f8a86]">·</span>
                                <span className="text-[#8f8a86]">{doc.year}</span>
                                {doc.keywords?.slice(0, 3).map((kw: string, i: number) => (
                                  <span
                                    key={i}
                                    className="bg-[#2a2826]/20 text-[#8f8a86] px-2 py-0.5 rounded-full"
                                  >
                                    {kw}
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm text-[#8f8a86] leading-relaxed mt-2 line-clamp-2">
                                {doc.summary}
                              </p>
                            </div>
                            <a
                              href={doc.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 p-2 rounded-lg bg-[#2a2826]/40 text-[#8f8a86] hover:text-[#f5f0eb] hover:bg-[#2a2826]/60 transition-colors"
                            >
                              <ArrowRight size={16} />
                            </a>
                          </div>
                          <div className="mt-3 pt-3 border-t border-[#2a2826]/40 flex items-center justify-between">
                            <span className="text-xs font-mono text-[#8f8a86]">
                              {doc.citation_format}
                            </span>
                            <span className="text-xs text-[#d4a017]">
                              {doc.id}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer Stats */}
        {!hasSearched && (
          <div className="mt-16 pt-8 border-t border-[#2a2826]/40">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-[#d4a017]">4</div>
                <div className="text-xs text-[#8f8a86]">Jurisdictions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#d4a017]">40</div>
                <div className="text-xs text-[#8f8a86]">Foundational Texts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#d4a017]">Open</div>
                <div className="text-xs text-[#8f8a86]">License</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#d4a017]">∞</div>
                <div className="text-xs text-[#8f8a86]">Expandable</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#2a2826]/40 py-6 px-6 md:px-12 text-center text-xs text-[#8f8a86]">
        <p>Open Legal Corpus · Built for Africa · Built in the open</p>
      </footer>
    </div>
  )
}
