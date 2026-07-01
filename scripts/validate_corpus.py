#!/usr/bin/env python3
"""
Open Legal Corpus - Validation Tool
-----------------------------------
Scans all JSON files in the data/ directory and validates them against the required schema.

Usage:
    python scripts/validate_corpus.py
"""

import json
import sys
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"

# Required fields for a corpus document
REQUIRED_DOC_FIELDS = {
    "id": str,
    "title": str,
    "type": str,
    "year": int,
    "summary": str,
    "keywords": list,
    "source_url": str,
    "citation_format": str,
}

# Required top-level fields for a corpus file
REQUIRED_CORPUS_FIELDS = {
    "corpus_name": str,
    "jurisdiction": str,
    "description": str,
    "last_updated": str,
    "documents": list,
}


def validate_corpus_file(filepath: Path) -> list:
    """
    Validate a single corpus JSON file against the schema.
    Returns a list of error messages.
    """
    errors = []

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        errors.append(f"❌ Invalid JSON: {e}")
        return errors
    except Exception as e:
        errors.append(f"❌ Could not read file: {e}")
        return errors

    # Validate top-level fields
    for field, expected_type in REQUIRED_CORPUS_FIELDS.items():
        if field not in data:
            errors.append(f"❌ Missing top-level field: '{field}'")
        elif not isinstance(data[field], expected_type):
            errors.append(f"❌ Field '{field}' should be of type {expected_type.__name__}")

    # Validate documents array
    if "documents" in data and isinstance(data["documents"], list):
        for i, doc in enumerate(data["documents"]):
            if not isinstance(doc, dict):
                errors.append(f"❌ Document at index {i} is not an object")
                continue

            for field, expected_type in REQUIRED_DOC_FIELDS.items():
                if field not in doc:
                    errors.append(f"❌ Document {i} missing field: '{field}'")
                elif not isinstance(doc[field], expected_type):
                    errors.append(
                        f"❌ Document {i}.'{field}' should be of type {expected_type.__name__}"
                    )

            # Ensure keywords is a list of strings
            if "keywords" in doc and isinstance(doc["keywords"], list):
                for j, kw in enumerate(doc["keywords"]):
                    if not isinstance(kw, str):
                        errors.append(
                            f"❌ Document {i}.keywords[{j}] should be a string"
                        )

    return errors


def main():
    """
    Validate all corpus files in the data directory.
    """
    print("\n📋 Validating Open Legal Corpus files...\n")

    all_errors = {}
    files_checked = 0
    files_valid = 0

    for filepath in DATA_DIR.glob("*-corpus.json"):
        files_checked += 1
        errors = validate_corpus_file(filepath)

        if errors:
            all_errors[filepath.name] = errors
        else:
            files_valid += 1
            print(f"✅ {filepath.name} — valid")

    if all_errors:
        print("\n❌ Validation errors found:\n")
        for filename, errors in all_errors.items():
            print(f"--- {filename} ---")
            for err in errors:
                print(f"  {err}")
        sys.exit(1)

    print(f"\n✅ All {files_checked} files passed validation. Corpus is healthy.")
    print("\nThe OLC is ready for contribution.\n")


if __name__ == "__main__":
    main()
