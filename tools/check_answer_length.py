#!/usr/bin/env python3
"""Report answer-length bias in the O Level CS MCQ bank.

A question has length bias when its correct answer is noticeably
longer than every distractor: students can then guess the longest
option without knowing the topic. This script measures that bias,
per chapter, for assets/mcq/olevel-cs-mcq-bank.json.

Definitions (length = number of characters in the option text,
as printed, including spaces and punctuation):
  - strictly longest: the correct option is longer than every
    distractor (strict >). This is the headline percentage.
  - tied longest: the correct option shares the maximum length
    with at least one distractor. Reported separately, so the
    headline percentage is reproducible and does not hide ties.
  - gap: correct length minus the longest distractor length.
    The "worst offenders" are the questions with the largest gap.

Usage, from the site folder:
    python3 tools/check_answer_length.py
    python3 tools/check_answer_length.py --top 20
    python3 tools/check_answer_length.py --chapter 3
    python3 tools/check_answer_length.py --bank path/to/bank.json

This script only reads the bank. It never writes to it.
Exit code is always 0: a high percentage is a review finding,
not a script failure (see tools/validate_banks.py for checks
that do fail the build).
"""

import argparse
import json
import sys
from pathlib import Path

DEFAULT_BANK = Path(__file__).resolve().parent.parent / "assets" / "mcq" / "olevel-cs-mcq-bank.json"


def analyse_chapter(chapter):
    """Return (stats, offenders) for one chapter dict."""
    questions = chapter.get("questions", [])
    total = len(questions)
    strict = 0
    tied = 0
    offenders = []
    for q in questions:
        options = q.get("options", [])
        answer = q.get("answer")
        if not options or answer is None:
            continue
        if not (0 <= answer < len(options)):
            continue
        lengths = [len(str(o)) for o in options]
        correct_len = lengths[answer]
        distractor_lengths = [l for i, l in enumerate(lengths) if i != answer]
        if not distractor_lengths:
            continue
        longest_distractor = max(distractor_lengths)
        if correct_len > longest_distractor:
            strict += 1
            offenders.append({
                "id": q.get("id", "?"),
                "question": q.get("question", ""),
                "correct": options[answer],
                "correct_len": correct_len,
                "longest_distractor_len": longest_distractor,
                "gap": correct_len - longest_distractor,
                "distractors": [o for i, o in enumerate(options) if i != answer],
            })
        elif correct_len == longest_distractor:
            tied += 1
    offenders.sort(key=lambda o: (-o["gap"], o["id"]))
    stats = {
        "number": chapter.get("number"),
        "title": chapter.get("title", ""),
        "total": total,
        "strict": strict,
        "tied": tied,
        "strict_pct": (100.0 * strict / total) if total else 0.0,
        "tied_pct": (100.0 * tied / total) if total else 0.0,
    }
    return stats, offenders


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--bank", default=str(DEFAULT_BANK),
                        help="Path to the O Level MCQ bank JSON.")
    parser.add_argument("--top", type=int, default=10,
                        help="How many worst offenders to list per chapter.")
    parser.add_argument("--chapter", type=int, default=None,
                        help="Only report this chapter number.")
    args = parser.parse_args()

    try:
        bank = json.loads(Path(args.bank).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: cannot read bank {args.bank}: {exc}", file=sys.stderr)
        return 2

    print("Answer-length bias: O Level CS MCQ bank")
    print(f"Bank: {args.bank}")
    print()
    print(f"{'Chapter':<10}{'Questions':>10}{'Strictly':>10}{'Tied':>8}")
    print(f"{'':<10}{'':>10}{'% longest':>10}{'% longest':>8}")
    print("-" * 38)

    all_stats = []
    for chapter in bank.get("chapters", []):
        if args.chapter is not None and chapter.get("number") != args.chapter:
            continue
        stats, offenders = analyse_chapter(chapter)
        all_stats.append((stats, offenders))
        label = f"Ch {stats['number']}"
        print(f"{label:<10}{stats['total']:>10}{stats['strict_pct']:>9.1f}%{stats['tied_pct']:>7.1f}%")

    total_q = sum(s["total"] for s, _ in all_stats)
    total_strict = sum(s["strict"] for s, _ in all_stats)
    if total_q:
        print("-" * 38)
        print(f"{'All':<10}{total_q:>10}{100.0 * total_strict / total_q:>9.1f}%")
    print()
    print("Worst offenders (largest gap between the correct option and")
    print("the longest distractor). Lengths are in characters.")
    print()

    for stats, offenders in all_stats:
        print(f"--- Chapter {stats['number']}: {stats['title']} "
              f"({stats['strict']} of {stats['total']} strictly longest, "
              f"{stats['strict_pct']:.1f}%) ---")
        for off in offenders[: args.top]:
            print(f"  {off['id']}: correct {off['correct_len']} chars, "
                  f"longest distractor {off['longest_distractor_len']} chars, "
                  f"gap +{off['gap']}")
            print(f"    Q: {off['question']}")
            print(f"    Correct: {off['correct']}")
            for d in off["distractors"]:
                print(f"    Distractor ({len(str(d))} chars): {d}")
        if not offenders:
            print("  (no strictly-longest correct answers)")
        print()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
