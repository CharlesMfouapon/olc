<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=700&size=32&duration=3000&pause=1000&color=006b3f&center=true&vCenter=true&width=600&lines=Open+Legal+Corpus+(OLC);Public+Infrastructure+for+African+Law;Curated+·+Structured+·+Open" alt="OLC Header" />

<br>

<img src="https://img.shields.io/badge/status-live-006b3f?style=for-the-badge&logo=vercel&logoColor=white" alt="Status: Live" />
<img src="https://img.shields.io/badge/jurisdictions-OHADA_%2B_3_Planned-2a2a2a?style=for-the-badge" alt="Jurisdictions: OHADA + 3 Planned" />
<img src="https://img.shields.io/badge/license-CC_BY_4.0-006b3f?style=for-the-badge" alt="License: CC BY 4.0" />
<img src="https://img.shields.io/github/stars/CharlesMfouapon/olc?style=for-the-badge&color=d4a017" alt="GitHub Stars" />

<br>
<br>

</div>

---

# Open Legal Corpus (OLC)

### A Public, Curated, Machine-Readable Database of African Legal Texts.

The Open Legal Corpus (OLC) is an open-source initiative to digitize, structure, and preserve the foundational legal texts of African jurisdictions. 

It is built for legal professionals, researchers, and technologists who need reliable, structured access to African law—without scraping government websites or hunting through fragmented PDF archives.

**The OLC is not a product. It is infrastructure.**

---

## Mission

African legal systems are rich, complex, and deeply rooted in both colonial history and post-independence innovation. However, their primary texts—treaties, uniform acts, statutes, and landmark judgments—remain scattered across isolated government portals, outdated websites, and offline archives.

The Open Legal Corpus exists to close this gap.

By providing a single, curated, machine-readable source of truth, the OLC empowers:
- **Legal practitioners** to conduct faster cross-jurisdictional research.
- **Legal technologists** to build AI tools that actually understand African law.
- **Students and academics** to study African jurisprudence with reliable citations.

---

## Current Jurisdictions

| Jurisdiction | Status | Texts | Last Updated |
| :--- | :--- | :--- | :--- |
| **OHADA** | ✅ Live | 10 Uniform Acts | July 2026 |
| ECOWAS | 🔜 Next | Planned | — |
| EAC | 🔜 Next | Planned | — |
| Cameroon (National) | 🔜 Next | Planned | — |

> *The OLC is jurisdiction-agnostic by design. Any African legal system can be added.*

---

## Structure

Each jurisdiction is stored as a structured JSON file in `data/`.

**Schema:**

```json
{
  "corpus_name": "OHADA Legal Corpus",
  "jurisdiction": "OHADA",
  "last_updated": "2026-07-01",
  "documents": [
    {
      "id": "OHADA-UA-GCL-001",
      "title": "Uniform Act on General Commercial Law",
      "type": "Uniform Act",
      "year": 2010,
      "summary": "The foundational commercial code for OHADA.",
      "keywords": ["commercial law", "contracts", "sales"],
      "source_url": "https://www.ohada.org/",
      "citation_format": "OHADA Uniform Act on General Commercial Law (2010)"
    }
  ]
}
```

---

## How to Contribute

The OLC is a community-driven project. You do not need to be a lawyer or a developer to contribute.

You can help by:

- Curating new jurisdictions: If you have expertise in ECOWAS, EAC, SADC, or a specific national legal system, open a Pull Request with a new JSON file.
- Expanding existing corpora: Add more uniform acts, regulations, or landmark judgments to the OHADA corpus.
- Reviewing and verifying: Help verify that the summaries and citations are accurate.

### Contribution Guidelines

1. Fork the repository.
2. Add or edit a JSON file in the data/ directory.
3. Ensure the schema matches the existing structure.
4. Open a Pull Request with a brief description of your changes.

All contributions are publicly attributed.

---

## License

This project is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).

You are free to share and adapt the corpus for any purpose, provided you give appropriate credit.

---

## Contact

For questions, suggestions, or collaborations:

GitHub: CharlesMfouapon/olc

Email: charlesmfouapon@outlook.com

---

Built for Africa. Built in the open.
