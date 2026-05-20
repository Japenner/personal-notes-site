---
title: "Full Walkthrough: Workflow for AI Coding — Matt Pocock"
video_id: "-QFHIoCo-Ko"
source_url: "https://youtu.be/-QFHIoCo-Ko"
transcript_file: "full_walkthrough_workflow_for_ai_coding__matt_pocock.txt"
processed_at: "2026-05-20T00:49:45Z"
provider: "anthropic"
model: "claude-sonnet-4-6"
template: "technical_extraction"
---

# Full Walkthrough: Workflow for AI Coding — Matt Pocock

## Core Concepts & Vocabulary

- **Smart Zone / Dumb Zone** — An LLM performs best at the start of a conversation when attention relationships are least strained. Performance degrades around ~100K tokens regardless of total context window size (quadratic scaling of attention relationships). Beyond that threshold = "dumb zone."
- **Compacting** — Summarizing a long conversation into a compressed history to reduce token count. The author avoids this, preferring to clear context entirely and restart from a known-clean state.
- **Sub-agents** — A delegated LLM call with its own isolated context window. Reports a summary back to the parent (orchestrator) agent. Burns tokens in its own context, not the parent's.
- **Human-in-the-loop vs. AFK tasks** — Planning/alignment requires a human present; implementation can run unattended ("away from keyboard").
- **Traceable Bullets / Vertical Slices** — Tasks that cut across all system layers (DB → API → UI) in one thin slice, enabling immediate end-to-end feedback. Contrasted with horizontal slices (all DB work first, then all API work, etc.).
- **Deep Modules vs. Shallow Modules** (John Ousterhout, *Philosophy of Software Design*) — Deep modules expose a small interface with substantial internal logic; easy to test and easy for agents to reason about. Shallow modules are numerous small files with many interdependencies; hard to test and hard for agents to navigate.
- **Doc Rot** — Stale documentation (e.g., old PRDs left in the repo) that agents find and treat as authoritative, leading to incorrect behavior.
- **Design Concept** (Frederick P. Brooks, *The Design of Design*) — The shared mental model that must exist between all participants (human and AI) before implementation begins.
- **Skills** — Short prompt files stored in the repo with a description header. Invoked explicitly (e.g., `/grill-me`). Agents can also *pull* them on demand.
- **Push vs. Pull instructions** — Push: always-present context (e.g., `CLAUDE.md`). Pull: optional files the agent fetches when needed (skills). Coding standards → push to reviewer, pull for implementer.

---

## Key Insights

- **100K tokens ≈ smart zone ceiling** — This holds regardless of advertised context window size. Larger windows mostly extend the dumb zone, which is better for retrieval tasks than for coding.
- **Clearing > compacting** — A clean context is predictable. Compacted context carries sediment (accumulated ambiguity and errors) from prior sessions.
- **Specs-to-code doesn't work** — Ignoring the code in favor of iterating specs produces poor results. The code is the "battleground"; you must keep a handle on it throughout.
- **AI codes horizontally by default** — Without explicit instruction, agents do all DB work, then all API work, then all UI work. This delays feedback until the final phase. Must be explicitly corrected with vertical slice requirements.
- **AI produces shallow modules by default** — Left unsupervised, agents generate many small files with complex interdependencies. This degrades testability and future agent performance in the codebase.
- **Bad codebases produce bad agent output** — The quality of feedback loops (tests, type checks) is the ceiling for AI coding quality. Improving the codebase architecture improves AI output directly.
- **Alignment > documentation** — The value of a grilling session is reaching shared understanding, not producing a readable artifact. You don't need to read the PRD carefully; the LLM does.
- **Review in the smart zone** — Run a separate, fresh-context agent for code review rather than asking the same context to review its own implementation (which happens in the dumb zone).
- **Design the interface; delegate the implementation** — Define module shapes and interfaces explicitly; let agents fill in internals. This preserves developer mental model of the codebase without requiring review of every line.

---

## Practical Guidance

### Session Management

- Monitor token count continuously via the status line in your coding agent
- Start fresh contexts rather than compacting; optimize workflows to make clean starts viable
- Keep system prompts minimal — large system prompts push you into the dumb zone before work begins

### Planning Workflow (Human-in-the-loop)

1. **Grill Me** — Invoke the grill-me skill with the client brief. Answer questions one at a time. Let it ask 20–100 questions. Accept its recommendations when you lack a strong opinion. This creates the shared design concept.
2. **Write PRD** — After grilling, generate a Product Requirements Document. Include: problem statement, solution, user stories, implementation decisions, testing decisions, out-of-scope items (definition of done), and proposed modules to modify.
3. **PRD → Kanban issues** — Convert PRD into independently grabbable issues using vertical slice / traceable bullet rules. Each issue should cross all necessary layers. Verify the first slice is truly vertical, not horizontal.
4. **Review the Kanban board** — Check for parallelization opportunities (directed acyclic graph of blocking relationships). Issues without blockers can be run simultaneously.

### Implementation (AFK)

- Pass all backlog issues + last N commits into a single context at the start of each run
- Agent selects next task based on priority rules (bugs → infra → trace bullets → polish)
- Enforce TDD (red-green-refactor): agent writes a failing test first, then implements to pass
- Run type checks and tests as feedback loops within each implementation cycle
- Use Docker sandboxing for AFK loops
- For parallelization: planner selects N issues → N sandboxed implementers run simultaneously → reviewer per branch → merger resolves conflicts

### Code Review & QA

- Run a fresh-context reviewer with coding standards pushed into its context
- QA manually to impose taste and catch issues automated review misses
- During QA, create new Kanban issues for bugs and gaps found; keep the board live
- Do not automate QA fully — human judgment is required to avoid "slop"

### Codebase Architecture

- Run `improve-code-base-architecture` skill periodically to identify shallow module clusters
- Consolidate related shallow modules into deep modules with narrow interfaces
- Write tests at the module boundary, not around individual functions
- Keep module map in mind throughout planning and include proposed modules explicitly in PRDs

### Documentation Lifecycle

- Delete or close PRDs after implementation; do not leave them in the repo as living documents
- Use GitHub issue status (open/closed) as a signal to agents about relevance
- Skills and coding standards should live in the repo as pull-able resources for implementers

---

## Caveats & Prerequisites

- **Front-end is harder to automate** — Agent browser / Playwright MCP for visual QA is immature. Recommended workaround: generate multiple prototype variants in a throwaway route for human selection, then feed chosen design back into planning.
- **Code review volume increases** — Delegating implementation to agents means more code to review, not less. No clear solution yet; practitioners should expect this overhead.
- **Planning cannot be fully automated** — Alignment (grilling) and QA require human presence. Attempting to automate these phases produces low-quality output.
- **Parallelization requires well-structured blocking relationships** — Sequential plans cannot be parallelized; Kanban structure is a prerequisite.
- **TDD is prerequisite for reliable agent output** — Without test-first discipline, agents cheat by writing tests after implementation and testing the wrong things.
- **Old software engineering books remain applicable** — *The Pragmatic Programmer*, *Refactoring* (Fowler), *The Design of Design* (Brooks), *A Philosophy of Software Design* (Ousterhout) provide directly usable vocabulary and mental models for AI-assisted development.
