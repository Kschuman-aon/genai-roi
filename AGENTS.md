Before generating content for the chapters, lesson plans, quizzes, FAQ or other student-facing
text, read the `CONTENT-GENERATION-GUIDE.md` file. Note that the teacher guide, instructor guide,
or other instructor-facing content does not use the mascot described in CONTENT-GENERATION-GUIDE.md.

## Chapter generation workflow (token-efficient)

These rules override the per-chapter logging steps of the `chapter-content-generator` skill.

1. **Write each chapter in one `Write` call**, not an intro file plus appended parts. Every extra
   turn replays the whole conversation.
2. **Validate with one command**, not separate mascot, concept, and build calls:

       scripts/validate-chapter.py 11 --fix --build      # one or more chapter numbers
       scripts/validate-chapter.py --all                 # every chapter that has content

   `--fix` removes stray `</details>` tags that otherwise appear after mascot admonitions (a
   recurring slip). The script checks the TODO placeholder, front matter, balanced `<details>`
   blocks, concept coverage, mascot rules, MicroSim specification fields and Bloom verbs, build
   wording, and `$$` math. `--build` adds `mkdocs build --strict` into a temp directory. Fix every
   ERROR it prints; warnings are advisory. (On this machine `$BK_HOME` points at a
   directory that does not exist; the script finds the mascot validator in `~/projects/ibook-skills`
   on its own, so no environment setup is needed.)
3. **One log per session, not per chapter.** Do not write `logs/ch-NN-content-generation.md`. At
   the end, write a single `logs/chapter-content-generator-YYYY-MM-DD.md` with the chapters done,
   word counts, validation results, and measured token usage from:

       scripts/token-usage.py --since-text "<words from the opening request>" --markdown

   Use `--mark NAME` / `--from-mark NAME` to get per-chapter splits when they are wanted. The
   script includes subagent transcripts automatically.
4. **Fresh chat every 4-5 chapters**, or sooner if the chat becomes long. All state lives in the
   repo, so nothing is lost. Say "generate chapters N-M" and follow this file.
5. **Do not commit or publish unless asked.**

Chapters 9 and 10 share one running example (a $60,000 support-assistant investment, NPV $38,272
at 10%, ROI 37.5%); later financial chapters should continue it.
