# Development Prompts

This document records the prompts used to guide AI-assisted development of the
Kanban Task Board application, as required by the Prodesk IT Sprint 5
assignment.

## Milestone 1 — React Component Architecture

**Goal:** Establish a clean, beginner-friendly React component structure
before implementing task functionality.

**Prompt summary:**
Set up the component architecture for a Kanban Task Board using React, Vite,
and JavaScript only (no additional libraries). Required components:

- `Header` — displays the application title
- `TaskForm` — UI for adding a task (title input, priority dropdown, submit
  button), without functional task creation yet
- `KanbanBoard` — renders three columns (To Do, In Progress, Done)
- `Column` — a single reusable column component driven by props
- `TaskCard` — a single reusable task card component driven by props

State was limited to what was needed to demonstrate the architecture, using
only React's built-in `useState` where required. No state-management
libraries, CSS frameworks, or unrelated dependencies were introduced.

## Repository Cleanup

**Goal:** Remove tool-generated and unused files before the first Git commit,
without changing application functionality.

**Prompt summary:**
Review the repository and remove files not required to build or run the
application (unused default Vite template assets, editor/tool-specific
configuration, temporary files), remove non-essential comments from source
files, and confirm the project still lints and builds successfully.
