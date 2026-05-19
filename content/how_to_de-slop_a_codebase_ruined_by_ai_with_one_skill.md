# How To De-Slop A Codebase Ruined By AI (with one skill)

Source: <https://youtu.be/3MP8D-mdheA>

---

## Core Problem: AI Accelerates Software Entropy

Every AI-generated change that doesn't account for the full codebase introduces small degradations. These compound until the codebase becomes a "ball of mud" — hard to change, hard to reason about, and hard to reverse.

---

## Vocabulary That Matters (shared with AI)

Having a shared vocabulary with the AI lets you communicate precisely and get better results. The key terms:

- **Module** — a cohesive unit of functionality (a page's components, auth logic, a logger)
- **Interface** — everything a caller must know to use the module (method signatures + documentation + calling conventions)
- **Implementation** — what the module actually does internally
- **Deep module** — large implementation, small interface. Hides complexity. Callers get high leverage.
- **Shallow module** — small implementation, complex interface. Forces callers to know too much.
- **Depth** — behavior a caller can exercise per unit of interface they have to learn
- **Seam** — the location where a module's interface meets the rest of the app; the natural boundary for mocking/testing
- **Adapter** — a concrete module that satisfies an interface at a seam (real clock in prod, fake clock in tests)
- **Locality** — related things and co-changing things live in one place
- **Leverage** — capability you get per unit of interface you learn

**Reference:** John Ousterhout's *A Philosophy of Software Design*

---

## What a Sloppy AI Codebase Looks Like

- Lots of **shallow modules** (complex interface, little implementation)
- **Low locality** — related things scattered across many files
- **Parallel implementations** — the same concept implemented in two places (frontend + backend) with no shared seam, so they drift out of sync
- **Untested seams** — no mocking points = no isolation = no trust

---

## The Fix: Deepening Modules

The cure for AI-slop is systematically finding opportunities to:

1. **Collapse parallel implementations** into a single module with one interface
2. **Add seams** where none exist (enable testing)
3. **Increase locality** — collocate things that change together
4. **Deepen shallow modules** — push implementation down, shrink the interface

---

## Human-in-the-Loop Is Non-Negotiable

The AI is a **tactical programmer**: fast at ground-level changes, but needs direction.
You are the **strategic programmer**: you decide what changes serve the long-term health of the codebase.

This kind of architecture work **cannot be AFK'd** — it demands judgment calls from a human above the LLM.

---

## Cadence Recommendation

Run an architecture review skill **every few days** in fast-moving codebases. The more the codebase moves, the more deepening opportunities accumulate.

---

## Starting on a Legacy Codebase

A legacy codebase = a codebase that's hard to change. It's almost certainly full of shallow modules.

The order of operations:

1. First, build a **test harness** around the codebase (deep modules with clear seams)
2. Then, use AI to make changes — the tests catch regressions

Good tests require deep modules. Deep modules require deliberate architecture. You can't skip to step 2.

---

## Testing Payoff

Deep modules with clear seams → clean unit/integration tests → better AI output. The agent is only as reliable as the test suite it's working against.
