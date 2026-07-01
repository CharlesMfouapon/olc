# Data Directory

This directory contains the primary corpus files for the Open Legal Corpus. Each file is a structured JSON document representing a specific African jurisdiction.

---

## Structure

```

data/
├── README.md               # You are here
├── ohada-corpus.json       # OHADA Uniform Acts (Live)
├── ecowas-corpus.json      # ECOWAS Treaty & Regulations (Planned)
├── eac-corpus.json         # EAC Common Market Protocol (Planned)
└── cameroon-corpus.json    # Cameroon National Law (Planned)

```

---

## Schema

Every corpus file follows this exact JSON schema:

```json
{
  "corpus_name": "string",
  "jurisdiction": "string",
  "description": "string",
  "last_updated": "YYYY-MM-DD",
  "documents": [
    {
      "id": "string (unique identifier)",
      "title": "string",
      "type": "string (e.g. Uniform Act, Treaty, Statute, Judgment)",
      "year": integer,
      "summary": "string (1-2 sentences)",
      "keywords": ["string", "string", "..."],
      "source_url": "string (URL to the official source)",
      "citation_format": "string (how to cite this text in legal writing)"
    }
  ]
}
```

---

## Adding a New Jurisdiction

To add a new jurisdiction to the corpus:

1. Create a new JSON file in this directory named [jurisdiction]-corpus.json.
2. Copy the schema from an existing file.
3. Fill in the metadata and at least 5 documents.
4. Open a Pull Request.

All jurisdictions must include:

- A unique id for each document (e.g., ECOWAS-TREATY-001).
- A source_url that points to the official, authoritative source.
- A citation_format that follows the standard legal citation practice for that jurisdiction.

---

## Maintaining the Corpus

- Dates: Always update last_updated when you add or modify a document.
- Citations: If a document is superseded, update the summary to reflect the current status and leave a note in the id.
- Quality: All summaries and keywords are manually curated. Automated scraping is welcome, but all submissions are manually reviewed before merging.

---

The OLC is a living archive. Contributions are welcome.
