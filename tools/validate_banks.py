#!/usr/bin/env python3
"""Validate all four MCQ banks used by the Practice page.

Checks, for every question in every bank:
  1. duplicate ids (within each bank, and across all banks)
  2. answer index out of range (missing, non-integer, or not
     0 <= answer < number of options)
  3. duplicate options within a question (compared after
     stripping surrounding whitespace, so an exact duplicate
     and a whitespace-only difference are both caught)
  4. empty options (an option that is empty or whitespace-only,
     or a question with no options at all)
  5. missing explanation (field missing, or empty/whitespace-only)
  6. missing figure files (a non-empty "figure" path that does
     not exist on disk, resolved from the site root)

Banks checked by default (relative to the site folder):
  assets/mcq/hsc-ict-mcq-bank.json      (NCTB HSC ICT)
  assets/mcq/hsc-board-papers.json      (Board Papers)
  assets/mcq/hsc-ict-new-mcq-bank.json  (HSC ICT Notes Bank)
  assets/mcq/olevel-cs-mcq-bank.json    (Cambridge O Level CS)

Usage, from the site folder:
    python3 tools/validate_banks.py
    python3 tools/validate_banks.py assets/mcq/hsc-board-papers.json

Exit code: 0 when no problems are found, 1 when any problem is
found. The script only reads files; it never writes to a bank.

Deliberately NOT checked here: a question having fewer or more
than 4 options. Board paper board-2016-rajshahi-q08 is a known
defective paper question that was printed with only 2 options
and is kept deliberately, with an explanation that says so. It
passes all six checks above, so it does not fail this script.
"""

import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent

DEFAULT_BANKS = [
    SITE_ROOT / "assets" / "mcq" / "hsc-ict-mcq-bank.json",
    SITE_ROOT / "assets" / "mcq" / "hsc-board-papers.json",
    SITE_ROOT / "assets" / "mcq" / "hsc-ict-new-mcq-bank.json",
    SITE_ROOT / "assets" / "mcq" / "olevel-cs-mcq-bank.json",
]

CHECKS = (
    "duplicate_id",
    "answer_out_of_range",
    "duplicate_options",
    "empty_option",
    "missing_explanation",
    "missing_figure",
)


def check_bank(path, site_root):
    """Return (total_questions, problems) for one bank file.

    problems is a list of (check_name, question_id, detail) tuples.
    """
    problems = []
    try:
        bank = json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return 0, [("unreadable_bank", "-", f"{path}: {exc}")]

    seen_ids = Counter()
    questions = []
    for chapter in bank.get("chapters", []):
        for q in chapter.get("questions", []):
            questions.append(q)
            seen_ids[q.get("id", "?")] += 1

    for qid, count in seen_ids.items():
        if count > 1:
            problems.append(("duplicate_id", qid,
                             f"id appears {count} times in this bank"))

    for q in questions:
        qid = q.get("id", "?")
        options = q.get("options")
        if not isinstance(options, list) or not options:
            problems.append(("empty_option", qid, "no options list"))
            options = []
        else:
            for idx, opt in enumerate(options):
                if not isinstance(opt, str) or not opt.strip():
                    problems.append(("empty_option", qid,
                                     f"option {idx} is empty"))
            stripped = [o.strip() if isinstance(o, str) else o for o in options]
            for opt, count in Counter(stripped).items():
                if count > 1:
                    problems.append(("duplicate_options", qid,
                                     f"option {opt!r} appears {count} times"))

        answer = q.get("answer")
        if (not isinstance(answer, int) or isinstance(answer, bool)
                or not options or not (0 <= answer < len(options))):
            problems.append(("answer_out_of_range", qid,
                             f"answer={answer!r}, options={len(options)}"))

        explanation = q.get("explanation")
        if not isinstance(explanation, str) or not explanation.strip():
            problems.append(("missing_explanation", qid,
                             "explanation is missing or empty"))

        figure = q.get("figure")
        if isinstance(figure, str) and figure.strip():
            figure_path = site_root / figure.strip().lstrip("/")
            if not figure_path.is_file():
                problems.append(("missing_figure", qid,
                                 f"figure file not found: {figure}"))

    return len(questions), problems


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("banks", nargs="*", default=[str(p) for p in DEFAULT_BANKS],
                        help="Bank JSON files to check (default: all four).")
    parser.add_argument("--root", default=str(SITE_ROOT),
                        help="Site root, used to resolve figure paths.")
    args = parser.parse_args()
    site_root = Path(args.root)

    all_problems = defaultdict(list)  # check -> list of (bank, qid, detail)
    global_ids = Counter()
    total_questions = 0
    bank_names = []

    for bank_path in args.banks:
        bank_name = Path(bank_path).name
        bank_names.append(bank_name)
        count, problems = check_bank(bank_path, site_root)
        total_questions += count
        # Track ids globally as well, from the bank file itself.
        try:
            bank = json.loads(Path(bank_path).read_text(encoding="utf-8"))
            for chapter in bank.get("chapters", []):
                for q in chapter.get("questions", []):
                    global_ids[q.get("id", "?")] += 1
        except (OSError, json.JSONDecodeError):
            pass
        for check, qid, detail in problems:
            all_problems[check].append((bank_name, qid, detail))

    for qid, count in global_ids.items():
        if count > 1:
            # Only report a global duplicate if it was not already
            # reported as a within-bank duplicate for the same id.
            already = any(q == qid for _, q, _ in all_problems["duplicate_id"])
            if not already:
                all_problems["duplicate_id"].append(
                    ("(across banks)", qid, f"id appears {count} times across banks"))

    total_problems = sum(len(v) for v in all_problems.values())
    print(f"Checked {len(bank_names)} bank(s), {total_questions} questions.")
    for bank_name in bank_names:
        print(f"  - {bank_name}")
    print()

    if total_problems == 0:
        print("OK: no problems found.")
        return 0

    for check in CHECKS + ("unreadable_bank",):
        items = all_problems.get(check, [])
        if not items:
            continue
        print(f"{check} ({len(items)}):")
        for bank_name, qid, detail in sorted(items):
            print(f"  {bank_name} :: {qid} :: {detail}")
        print()

    print(f"FAILED: {total_problems} problem(s) found.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
