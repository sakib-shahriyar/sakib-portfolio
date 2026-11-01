# Data review: ambiguous board questions (review only)

Status: **Originally review-only; applied on 2026-11-02, see the note below. Do not re-apply.**
Every proposal below is marked **needs my confirmation**. Nothing in
this report has been applied to `assets/mcq/hsc-board-papers.json`.

> **Applied on 2026-11-02, with Sakib's confirmation to drop all affected questions:** all four questions listed below (board-2024-dinajpur-q09, board-2024-sylhet-q21, board-2023-cumilla-q21, board-2016-sylhet-q15) were removed from the site board bank and from the by-year source files (2016, 2023, 2024). Board bank: 909 to 905 questions, 45 papers unchanged. The proposals below are now historical; do not re-apply them.


## Scope and method

- The four questions below are the ones you named. I checked them
  against the bank file, and I also ran a duplicate-option scan
  over the whole board bank: these four are the *only*
  duplicate-option questions in the 909-question board bank.
  There are no other hidden duplicates of this kind.
- Where a figure file exists, I opened it and enlarged it:
  - `board-2023-cumilla-q21`: `assets/mcq/figures/board/cumilla-q21.png`
  - `board-2016-sylhet-q15`: `assets/mcq/figures/board/sylhet-2016-q15-tree-v2.png`
- The other two questions have no figure file in the bank, so I
  could not verify them against the printed paper. That limit is
  stated under each question.
- Duplicate means the exact same option text appears twice.
  The practice engine can only credit one answer index, so a
  student who picks the other copy of the same text is marked
  wrong, even though the text is identical. That is why all four
  are unusable as single-answer questions in their current form.
- A general rule I followed: do not invent a new option for a
  named board paper unless the correct option is forced by a
  closed set (Cumilla) or by the figure itself (Sylhet 2016).
  Where a fix would be pure invention, I propose dropping the
  question instead, and say so.

---

## 1. board-2024-dinajpur-q09

- **Board / paper:** Dinajpur Board 2024
- **Question text:** প্রোগ্রামের ভুলত্রুটি সংশোধনের পদ্ধতিকে বলা হয়—
- **Current options:**
  - [0] ডিবাগিং
  - [1] এনকোডিং
  - [2] ডিবাগিং
  - [3] কারেকশন
- **Current answer index:** 2 (ডিবাগিং)
- **Figure:** none in the bank.
- **What looks wrong:** Options [0] and [2] are the exact same
  text, and that text is the correct answer. A student who picks
  [0] is right by the text, but the engine marks only [2] right.
  The bank's own explanation already records this: the printed
  question paper had ডিবাগিং in both (ক) and (গ). This is a
  board print error, not a transcription error.
- **Best proposed fix — needs my confirmation:**
  Drop this question from the board bank. There is no
  single-answer fix that stays faithful to the paper: changing
  [0] to a different word would invent a board option that was
  never printed, and keeping it means one correct text is
  scored wrong. If you want to keep it as a teaching example
  of a board print error, the alternative is to leave it
  unchanged and accept that students picking [0] will be
  marked wrong in practice. I do not recommend that alternative.

---

## 2. board-2024-sylhet-q21

- **Board / paper:** Sylhet Board 2024
- **Question text:** উদ্দীপকটির আউটপুট হবে—
- **Passage in the bank:**
  ```html
  <ul type = "circle">
  <li> ict </li>
  </ul>
  ```
- **Current options:**
  - [0] ○ ict
  - [1] □ ict
  - [2] □ ict
  - [3] ○ ict
- **Current answer index:** 3 (○ ict)
- **Figure:** none in the bank.
- **What looks wrong:** Two pairs are duplicated. Options [0]
  and [3] are both the correct answer (type="circle" gives a
  hollow circle, ○), and options [1] and [2] are both the same
  wrong answer (□). So the question has two correct texts and
  two copies of one wrong text, and only one index can be
  credited. I could not verify against the printed paper,
  because there is no figure file for this question, so I
  cannot tell whether this was a board print error or a
  transcription error.
- **Best proposed fix — needs my confirmation:**
  Drop this question from the board bank, for the same reason
  as Dinajpur q09: fixing it would require inventing two new
  options (for example, changing [0] to ● ict and [2] to a
  fourth distinct bullet), and those options are not verified
  from the paper. If you would rather keep the question, the
  reconstruction to confirm is: [0] → ● ict (disc type, a
  plausible confusion with circle), [2] → a fourth distinct
  bullet, answer stays [3] (○ ict). Do not apply that
  reconstruction without your confirmation, because it is a
  guess about what the paper originally printed.

---

## 3. board-2023-cumilla-q21

- **Board / paper:** Cumilla Board 2023
- **Question text:** চিত্রের আউটপুট হবে—
- **Figure:** `assets/mcq/figures/board/cumilla-q21.png`
  (opened and enlarged). The figure shows input A going
  through a NOT gate, then into an AND gate together with
  input B. The output is therefore ĀB. This matches the
  bank's explanation.
- **Current options:**
  - [0] AB
  - [1] ĀB
  - [2] ĀB
  - [3] AB̄
- **Current answer index:** 1 (ĀB)
- **What looks wrong:** Options [1] and [2] are the exact same
  text, and that text is the correct answer. The figure does
  not show the options, so I cannot tell from the figure
  whether the duplicate was in the paper or in transcription.
  What makes this case different from the two above is that
  the four options form a closed set: with two inputs A and B,
  the four combinations are AB, ĀB, AB̄ and ĀB̄. The bank
  has the first three, plus a duplicate of the second, and
  is missing only the fourth.
- **Best proposed fix — needs my confirmation:**
  Change option [2] from ĀB to ĀB̄, and keep the answer at
  index 1 (ĀB). The new option is the only missing member of
  the four-combination set, written in the bank's existing
  style: precomposed Ā followed by B with a combining macron.
  Update the explanation to note that the duplicate in the
  bank has been corrected to ĀB̄. Alternative, if you do not
  want to change a board option at all: drop the question.
  I recommend the ĀB̄ fix over dropping, because it is forced
  by the closed set rather than invented freely, but it still
  needs your confirmation.

---

## 4. board-2016-sylhet-q15

- **Board / paper:** Sylhet Board 2016
- **Question text:** 5 ও 7 নং কম্পিউটার নষ্ট হলে কোন কম্পিউটারগুলোর মধ্যে নেটওয়ার্ক সচল থাকবে?
- **Passage in the bank:** ট্রি: ১→(২,৩); ২→(৪,৫); ৩→(৬,৭)।
- **Figure:** `assets/mcq/figures/board/sylhet-2016-q15-tree-v2.png`
  (opened and enlarged). The tree matches the passage: 1 at
  the top, 2 and 3 below it, 4 and 5 below 2, 6 and 7 below 3.
  The figure image itself is cropped at the bottom: it shows
  options (ক) 1, 3 এবং 6 and (খ) 4 এবং 6, which match the
  bank, but (গ) and (ঘ) are cut off in the image, so the
  duplicate (গ) cannot be verified from the figure alone.
- **Current options:**
  - [0] 1, 3 এবং 6
  - [1] 4 এবং 6
  - [2] 1, 3 এবং 6
  - [3] 1, 3, 4 এবং 6
- **Current answer index:** 3 (1, 3, 4 এবং 6)
- **What looks wrong:** Two separate problems.
  1. Options [0] and [2] are exact duplicates.
  2. The current answer is not the full correct set. If nodes
     5 and 7 fail, the remaining nodes are 1, 2, 3, 4 and 6:
     node 2 is still connected to 1 and to 4, and node 3 is
     still connected to 1 and to 6. The bank's own explanation
     already admits this: it says the remaining nodes are
     ১,২,৩,৪,৬, that no option contains 2 (a print error),
     and that ঘ is only the nearest option. So the bank is
     currently crediting an answer that omits a node that is
     plainly still connected.
- **Best proposed fix — needs my confirmation:**
  Change option [2] to "1, 2, 3, 4 এবং 6" and move the answer
  to index 2. Then option [3] (1, 3, 4 এবং 6) becomes a close
  distractor that omits node 2, which is exactly the trap
  this question is testing. Update the explanation to state
  the full reasoning: 5 and 7 are leaves, so their failure
  does not disconnect 2, 3, 4 or 6 from 1. Alternative, if
  you do not want to change a board answer: drop the
  question. I recommend the [2] fix over dropping, because
  the correct set is forced by the figure itself, but changing
  the answer index is a bigger change than the Cumilla fix,
  so it needs your confirmation in particular.

---

## Summary for approval

| Question | Current problem | Proposed fix | Needs confirmation |
|---|---|---|---|
| board-2024-dinajpur-q09 | Correct answer printed twice | Drop the question | Yes |
| board-2024-sylhet-q21 | Correct answer twice, one wrong answer twice | Drop the question (reconstruction with ● / fourth bullet only as an alternative) | Yes |
| board-2023-cumilla-q21 | Correct answer twice, missing ĀB̄ | [2] → ĀB̄, answer stays [1] | Yes |
| board-2016-sylhet-q15 | Wrong option duplicated, and current answer omits node 2 | [2] → "1, 2, 3, 4 এবং 6", answer moves to [2] | Yes |

No proposal above has been applied. After your confirmation,
the approved fixes will be applied to the site bank and to the
by-year source file together, and the validator in
`tools/validate_banks.py` will be re-run to confirm the
duplicate-option list is empty.
