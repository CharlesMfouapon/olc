# Scripts Directory

This directory contains utility scripts for transforming, querying, and exporting the Open Legal Corpus.

The scripts are designed to be **simple, modular, and language-agnostic**. They allow researchers, legal engineers, and data scientists to turn the structured JSON corpus into actionable formats.

---

## Available Scripts

### `search_corpus.py`
A command-line search tool for the corpus.

```bash
python scripts/search_corpus.py --jurisdiction OHADA --keyword "arbitration"
```

Output:

- A list of matching documents with IDs, titles, and direct source URLs.
- Optional export to JSON, CSV, or plain text.

---

`export_to_markdown.py`

Generates a human-readable Markdown report from a jurisdiction file.

```bash
python scripts/export_to_markdown.py --jurisdiction OHADA --output ohada_report.md
```

Use case:

- Quickly generate a reference sheet for a specific jurisdiction.
- Use the output as the foundation for a legal memo or research note.

---

`build_citation_index.py`

Creates a searchable index of all citations across the entire corpus.

```bash
python scripts/build_citation_index.py
```

Output:

- A JSON file mapping every id to its citation_format and source_url.
- Enables quick lookup for legal writing and AI training pipelines.

---

`validate_corpus.py`

Validates that every JSON file in the data/ directory conforms to the required schema.

```bash
python scripts/validate_corpus.py
```

Output:

- A list of errors or warnings for any file that deviates from the schema.
- Ensures that contributions do not break the corpus integrity.

---

### Planned Scripts

- `diff_corpus.py` – Compare two versions of a corpus file and list added/removed/modified documents.
- `fetch_remote.py` – Fetch the latest official text from a source_url and suggest updates to the corpus.
- `generate_embeddings.py` – Generate vector embeddings for all documents, enabling semantic search (for use with legal AI tools).

---

## Requirements

- Python 3.10+
- Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```

---

## Language Choice

While the initial scripts are written in Python, the OLC is not language-locked.

Contributors are welcome to submit:

- Node.js / JavaScript scripts for web-based tooling.
- Rust binaries for high-performance parsing (e.g., olc-cli).
- Bash wrappers for quick automation.

The goal is to make the corpus accessible across the entire legal engineering ecosystem.

---

Scripts are infrastructure. Contribute your own.
