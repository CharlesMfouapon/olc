# Contributing to the Open Legal Corpus (OLC)

Thank you for your interest in contributing to the Open Legal Corpus. 

The OLC is a community-driven project. Whether you are a lawyer, a legal engineer, a law student, or a researcher, your contribution matters.

This document outlines how to contribute effectively.

---

## How to Contribute

### 1. Curate a New Jurisdiction

If you have expertise in a specific African legal system, you can add it to the corpus.

- Create a new JSON file in `data/` named `[jurisdiction]-corpus.json`.
- Copy the schema from `data/ohada-corpus.json`.
- Include at least **10 documents** (statutes, treaties, uniform acts, or landmark judgments).
- Ensure every document has:
  - A unique `id`
  - A `title`
  - A `year`
  - A `summary` (1–2 sentences)
  - A `source_url` pointing to an authoritative source
  - A `citation_format` suitable for legal writing
- Open a Pull Request with a brief description of your contribution.

---

### 2. Expand an Existing Jurisdiction

If you have expertise in OHADA, ECOWAS, EAC, or SADC, you can expand the existing corpus.

- Add new documents to the existing JSON file.
- Ensure the `last_updated` field reflects the current date.
- Open a Pull Request with a brief explanation of the additions.

---

### 3. Write or Improve a Script

The `scripts/` directory contains utilities for searching, exporting, and validating the corpus.

To contribute a script:
- Write a self-contained Python (or Node.js/Rust) script that interacts with the corpus.
- Add a clear usage example to the script's docstring or a README.
- Open a Pull Request with a description of what the script does and how to test it.

---

### 4. Review and Verify

Not every contribution requires writing code or JSON.

You can help by:
- Reviewing open Pull Requests for accuracy of legal citations and summaries.
- Verifying that `source_url`s are live and authoritative.
- Testing scripts and reporting bugs or improvements.

---

## Contribution Guidelines

### Quality Standard

- **Summaries:** Must be factually accurate and neutral. Avoid commentary or legal advice.
- **Keywords:** Must be relevant and consistent across the corpus.
- **Citations:** Must follow the standard legal citation format for that jurisdiction.
- **Source URLs:** Must point to an official, authoritative source (government portal, official journal, or recognized legal database).

### Commit Messages

Follow this format for commit messages:

type: brief description of the change

Optional detailed explanation.

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

### Pull Request Process

1. Fork the repository.
2. Create a branch: `feature/your-contribution`.
3. Make your changes.
4. Open a Pull Request against `main`.
5. Provide a clear title and description of your changes.

---

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By contributing, you agree to abide by its terms:

- Be respectful and inclusive.
- Assume good faith.
- Focus on the work, not the person.

---

## Questions?

If you are unsure about anything, open an issue in the repository, or reach out directly via the contact information in the [README](README.md).

---

*The OLC is built by the community, for the community.*
