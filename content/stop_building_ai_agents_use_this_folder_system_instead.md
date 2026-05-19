---
title: "Stop Building AI Agents. Use This Folder System Instead."
video_id: "MkN-ss2Nl10"
source_url: "https://youtu.be/MkN-ss2Nl10"
transcript_file: "stop_building_ai_agents_use_this_folder_system_instead.txt"
processed_at: "2026-05-18T00:56:25Z"
provider: "anthropic"
model: "claude-sonnet-4-6"
template: "technical_extraction"
---

# Stop Building AI Agents. Use This Folder System Instead

## Core Concepts & Vocabulary

- **Token**: The smallest meaningful unit an LLM processes (~¾ of a word). Finite quantity per context window. Burning tokens on irrelevant files degrades output quality and hits limits faster.
- **Context Window**: Total tokens an AI can "see" at once. Finite — loading everything into one session wastes it on irrelevant content.
- **Markdown (.md)**: Plain text with lightweight formatting (# for headers, - for bullets, ** for bold). Claude already outputs markdown; using .md files for instructions means no special tooling required.
- **Claude Code**: Anthropic's IDE-integrated agent that can read local folders and files directly, enabling file-system-aware workflows without copy-pasting into chat.
- **MCP (Model Context Protocol)**: A plug-and-play standard for connecting AI to external apps/services without custom integrations.
- **Skills**: Packaged sets of markdown files (and sometimes scripts) that encode a reusable process. Downloadable from GitHub repos. Most effective when wired into a routing system rather than run standalone.
- **Workspace Blueprint**: Author's term for a multi-folder structure where each folder handles a distinct kind of work, preventing the AI from loading irrelevant context.

---

## Key Insights

- **The root problem with chat-based AI use**: No persistence, no file access, forced re-prompting, token exhaustion from monolithic context. The folder-as-workspace pattern solves all four.
- **Folder structure IS the architecture**: No Python, no vector DB, no framework required for most workflows. A folder is the UI; markdown files are the logic.
- **Naming conventions replace databases**: If files follow a consistent naming pattern (e.g., `api-auth-guide_draft.md`, `2026-03_launch-week.md`), the AI can locate, retrieve, and organize files by instruction alone — no SQL or embedding queries needed.
- **Skills without routing are limited**: A skill is only as effective as its placement in a system. Embedding skills contextually (called only when needed) is more efficient than loading all skills at all times.
- **Traditional software routing, now in English**: The task-routing table (task → read these files, skip those, use these skills) is function-call routing that has existed for decades — just expressed as natural language markdown.
- **Multi-agent parallelism via folders**: You can have one Claude Code instance in the Writing Room and another in Production simultaneously, with files moving between them on instruction.

---

## Practical Guidance

### Three-Layer Architecture

| Layer | Role | Implementation |
|---|---|---|
| **1 — Map (Router)** | Always-loaded global context | `claude.md` in root: folder structure, naming conventions, routing table |
| **2 — Room Context** | Task-specific context, loaded on demand | One `.md` per workspace (e.g., `writing-room/context.md`) describing process, what to load/skip, which skills apply |
| **3 — Workspace Files** | Actual working artifacts | Drafts, specs, outputs in subfolders with consistent naming |

### Routing Table Pattern

Inside each context file, include a simple table:

```
| Task        | Read               | Skip              | Skills            |
|-------------|--------------------|--------------------|-------------------|
| Write draft | voice.md, style.md | design-system.md  | humanizer-skill   |
| Build spec  | design-system.md   | voice.md           | component-skill   |
```

This prevents the AI from guessing what's relevant and controls token spend precisely.

### Naming Convention as Navigation

Define naming rules in the root `claude.md` so the AI can locate files without being told explicitly:

- Drafts: `{topic}_draft.md`, `{topic}_v2.md`
- Newsletters: `{YYYY-MM}_{descriptor}.md`
- Outputs: stored in a designated `/output` subfolder

### Workflow for a Production Pipeline (Example)

1. `/brief` — intake doc or script
2. `/spec` — generated from brief, references design system
3. `/build` — active construction artifacts
4. `/output` — final deliverables

Each stage's context file specifies which reference docs to load at that stage only.

### Adapting the Template to Your Domain

- Content creator: Writing Room → Script Lab; Production → Edit Bay; Community → Distribution Hub
- Developer/freelancer: Design → Engineering; Intake → Brief; Production → Delivery
- The three-layer routing logic transfers unchanged; only folder names and context descriptions change.

### Loading Skills Contextually

- Wire skills into the specific room/stage context file where they're needed, not into the global `claude.md`
- Example: Call a `front-end-design-skill` only from the production spec stage, not from the writing room

---

## Caveats & Prerequisites

- **Claude Code required** for full folder-awareness (reading/writing files autonomously). Basic version works in Claude chat by manually instructing it to `read claude.md` first.
- **VS Code is optional**: The folder structure works with any file manager and Notepad. VS Code only adds convenience for navigating multiple files.
- **This scales with workflow clarity**: The system is only as good as the process descriptions in your context files. Vague markdown produces vague routing.
- **Not suitable for every use case**: Highly bespoke agent pipelines with complex state management may still require code-based frameworks; this approach targets the majority of practical knowledge-work workflows.
- **MCP is a separate topic**: The transcript flags it as requiring its own treatment — understanding it is not a prerequisite for the folder system but extends its reach.
