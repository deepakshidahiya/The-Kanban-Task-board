# Development Prompts

This document records the prompts used to guide AI-assisted development of the Kanban Task Board application, as required by the Prodesk IT Sprint 5 assignment.

## Milestone 1 — React Component Architecture

**Goal:** Establish a clean, beginner-friendly React component structure before implementing task functionality.

**Prompt summary:**
Set up the component architecture for a Kanban Task Board using React, Vite, and JavaScript only (no additional libraries). Required components:

- `Header` — displays the application title
- `TaskForm` — UI for adding a task (title input, priority dropdown, submit button), without functional task creation yet
- `KanbanBoard` — renders three columns (To Do, In Progress, Done)
- `Column` — a single reusable column component driven by props
- `TaskCard` — a single reusable task card component driven by props

State was limited to what was needed to demonstrate the architecture, using only React's built-in `useState` where required. No state-management libraries, CSS frameworks, or unrelated dependencies were introduced.

## Milestone 2 — Add Task

**Goal:** Implement task creation, demonstrating core React data-flow concepts: `useState`, lifting state up, and parent-to-child communication via props and callbacks.

**Prompt summary:**
Move task state into `App`, since it is the common parent of `TaskForm` and `KanbanBoard`. Add an `addTask` function that appends a new task (`id`, `title`, `priority`, `status: "todo"`) to the task list using an immutable state update, and pass it to `TaskForm` as a callback prop. Convert `TaskForm`'s inputs to controlled components, validate that the title is non-empty before submission, and clear the title (while retaining the selected priority) after a task is added. Pass the task list from `App` to `KanbanBoard` as a single source of truth, and have `KanbanBoard` filter tasks by status into the existing `To Do` / `In Progress` / `Done` columns.
No new dependencies were introduced.

## Milestone 3 — Delete Task + Visual Refresh

**Goal:** Let a user remove any task from the board, and give the existing UI a cleaner, more professional look without changing the component architecture or adding any library.

**Prompt summary:**
Add a `deleteTask` function in `App` that removes a task from state by filtering it out immutably, and thread it down as an `onDeleteTask` callback prop through `KanbanBoard` and `Column` to `TaskCard`, where a clearly labeled "Delete" button on each card triggers it. Refresh the CSS only: introduce a small set of design tokens (colors, shadows) in `index.css`, redesign task cards as clean white cards with a neutral priority badge (no priority-specific coloring, which belongs to a later Priority System milestone), add hover/focus states, a per-column task count badge, a two-line empty-state message, and a responsive layout that stacks columns on small screens. Add accessible names to the form's text input and priority select, and a descriptive `aria-label` on each delete button. Replace the leftover default Vite favicon with a simple static Kanban-themed SVG (`public/kanban-icon.svg`). No new dependencies were introduced, and no later-milestone features (move, edit, persistence, drag-and-drop) were implemented.

