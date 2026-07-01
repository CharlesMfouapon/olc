#!/usr/bin/env python3
"""
Open Legal Corpus - Markdown Export Tool
----------------------------------------
Converts a jurisdiction corpus into a structured Markdown document.

Usage:
    python scripts/export_to_markdown.py --jurisdiction OHADA --output ohada_report.md
"""

import json
import argparse
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"


def load_corpus(jurisdiction: str):
    filename = f"{jurisdiction.lower()}-corpus.json"
    filepath = DATA_DIR / filename

    if not filepath.exists():
        print(f"Error: Jurisdiction '{jurisdiction}' not found.")
        return None

    with open(filepath, "r", encoding="utf-8") as f:
        corpus = json.load(f)

    return corpus


def generate_markdown(corpus: dict) -> str:
    """
    Generate a structured Markdown document from a corpus.
    """
    lines = []

    # Title
    lines.append(f"# {corpus.get('corpus_name')}")
    lines.append("")
    lines.append(f"**Jurisdiction:** {corpus.get('jurisdiction')}")
    lines.append(f"**Description:** {corpus.get('description')}")
    lines.append(f"**Last Updated:** {corpus.get('last_updated')}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Documents
    for doc in corpus.get("documents", []):
        lines.append(f"## {doc.get('title')}")
        lines.append("")
        lines.append(f"- **ID:** `{doc.get('id')}`")
        lines.append(f"- **Type:** {doc.get('type')}")
        lines.append(f"- **Year:** {doc.get('year')}")
        lines.append("")
        lines.append(f"**Summary:** {doc.get('summary')}")
        lines.append("")
        lines.append(f"**Keywords:** {', '.join(doc.get('keywords', []))}")
        lines.append("")
        lines.append(f"**Source:** [{doc.get('source_url')}]({doc.get('source_url')})")
        lines.append(f"**Citation:** {doc.get('citation_format')}")
        lines.append("")
        lines.append("---")
        lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="Export a jurisdiction corpus to a Markdown document."
    )
    parser.add_argument(
        "--jurisdiction",
        type=str,
        default="OHADA",
        help="Jurisdiction to export (e.g., OHADA, ECOWAS, EAC)",
    )
    parser.add_argument(
        "--output",
        type=str,
        default="corpus_report.md",
        help="Output Markdown filename",
    )

    args = parser.parse_args()

    corpus = load_corpus(args.jurisdiction)
    if corpus is None:
        return

    markdown_content = generate_markdown(corpus)

    with open(args.output, "w", encoding="utf-8") as f:
        f.write(markdown_content)

    print(f"✅ Markdown report exported to: {args.output}")


if __name__ == "__main__":
    main()
