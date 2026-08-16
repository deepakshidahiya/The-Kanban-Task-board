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

**Goal:** Let a user remove any task from the board, and give the existing UI a cleaner, more professional, lavender-themed look without changing the component architecture or adding any library.

**Prompt summary:**
Add a `deleteTask` function in `App` that removes a task from state by filtering it out immutably, and thread it down as an `onDeleteTask` callback prop through `KanbanBoard` and `Column` to `TaskCard`, where a clearly labeled "Delete" button on each card triggers it. Refresh the CSS: introduce a consistent lavender design-token system (colors, border-radius, and shadow scales) in `index.css`, redesign task cards as clean white cards with a neutral priority badge (no priority-specific coloring, which belongs to a later Priority System milestone), add hover/focus states, a per-column task count badge and subtle accent color, a two-line empty-state message, a small SVG header brand mark, and a responsive layout that stacks columns on small screens. Add accessible names to the form's text input and priority select, and a descriptive `aria-label` on each delete button. Replace the leftover default Vite favicon with a simple static Kanban-themed SVG (`public/kanban-icon.svg`). No new dependencies were introduced, and no later-milestone features (move, edit, persistence, drag-and-drop) were implemented.

## Milestone 4 — Move Task

**Goal:** Let a user move a task between columns using action buttons on each card, satisfying the "action buttons mutate column state" requirement without drag-and-drop.

**Prompt summary:**
Add a `moveTask(taskId, newStatus)` function in `App` that updates only the matching task's `status` field via an immutable `map` over the task list, preserving `id`, `title`, and `priority`. Pass it down as an `onMoveTask` callback prop through `KanbanBoard` and `Column` to `TaskCard`, alongside the existing `onDeleteTask` flow — task state remains owned solely by `App`. `TaskCard` derives its available move actions from the task's current status (`todo` → "Move to In Progress"; `in-progress` → "Move to To Do" / "Move to Done"; `done` → "Move to In Progress") and never offers a button back to its own column. Styled the move buttons as a secondary lavender action, visually distinct from the danger-styled Delete button, wrapping cleanly on narrow screens. No drag-and-drop library, and no functionality beyond this milestone, was introduced.

## Milestone 5 — Inline Editing

**Goal:** Let a user edit a task's title directly inside its card, without a modal or separate page, while keeping task data owned solely by `App`.

**Prompt summary:**
Add an `updateTaskTitle(taskId, newTitle)` function in `App` that updates only the matching task's `title` field via an immutable `map`, preserving `id`, `priority`, and `status`, and pass it down as an `onUpdateTaskTitle` callback prop through `KanbanBoard` and `Column` to `TaskCard`. `TaskCard` owns its own local, temporary editing state (`isEditing`, `editedTitle`, a validation `error`) — clicking "Edit" swaps the title text for an autofocused, text-selected input while keeping the priority badge and Move actions available; "Save" trims the value, rejects empty or whitespace-only input with an inline, accessible error message, and only then calls `onUpdateTaskTitle`; "Cancel" discards the draft and restores the original title. The input also responds to Enter (save) and Escape (cancel).

A follow-up polish pass refined the editing experience: the validation error clears as soon as the user resumes typing; a `shouldRefocusEditButton` ref returns keyboard focus to the Edit button after Save or Cancel; a same-state guard prevents a duplicate update if Save is triggered twice in quick succession; the editing card gets a subtle lavender border/background tint instead of its normal hover lift; and task-card action buttons (Edit, Save, Move, Cancel, Delete) were consolidated into a shared `.task-card-btn` base class with primary/secondary/tertiary/danger modifiers for consistent sizing and a clear visual hierarchy. Long titles, tablet widths, and 375px mobile widths were verified to wrap and lay out without overflow. No new dependency was introduced, and no functionality beyond this milestone (priority-color system, localStorage, search, drag-and-drop) was implemented.

A separate follow-up replaced the header/favicon mark with a minimal circle-and-checkmark icon, reusing the same primary lavender token, and updated the project README to reflect the current feature set.

## Milestone 6 — Priority System

**Goal:** Give each task a visible priority indicator on its card, reinforcing the priority chosen at creation time without disrupting the lavender theme.

**Prompt summary:**
The priority dropdown (High / Medium / Low) already existed from Milestone 2 and needed no changes. Added a `priority-{high|medium|low}` class to each `TaskCard` derived from `task.priority`, and used it to drive a CSS custom property (`--priority-accent`, with a matching tint) consumed by a 4px card-left border accent and a coordinated priority badge — High renders in red, Medium in amber/yellow, and Low in green, reusing the existing `--danger` and `--success` tokens and adding one new `--warning` token for Medium. The card background stays white and the rest of the interface stays lavender; only the border and badge carry the priority color, and the priority text ("Priority: High") remains visible regardless of color for accessibility. Since priority is stored on the task object and never touched by `moveTask` or `updateTaskTitle`, the accent automatically follows the task through column moves and title edits with no extra logic required. No new dependency was introduced, and no functionality beyond this milestone was implemented.

## Milestone 7 — LocalStorage Persistence

**Goal:** Make the Kanban board's task state survive a hard refresh, using only the browser's native `localStorage`.

**Prompt summary:**
Added a single storage key, `kanbanTasks`. `App`'s `tasks` state is now initialized lazily from `localStorage.getItem('kanbanTasks')`, parsed with `JSON.parse` inside a `try/catch`; if the key is missing, the parsed value isn't an array, or parsing throws, the app safely falls back to an empty task list instead of crashing. A `useEffect` keyed on `tasks` writes `JSON.stringify(tasks)` back to the same key on every change, so Add, Delete, Move, and Edit are all persisted automatically through the existing state-update functions — no new persistence logic was needed per action. The full task object (`id`, `title`, `priority`, `status`) is stored, so priority styling and column placement are both restored correctly after a refresh.

## Milestone 8 — Global Task Search

**Goal:** Let a user filter visible tasks by title in real time, without touching the underlying task data.

**Prompt summary:**
Added a `searchTerm` state in `App` (not persisted to `localStorage`) and a new `SearchBar` component rendered between the task form and the board. On every render, `App` derives `filteredTasks` from `tasks` via a case-insensitive, trimmed `.filter()` on `title` — this is plain derived data, never stored as a second source of truth, and flows down to `KanbanBoard` → `Column` → `TaskCard` exactly like the unfiltered list did before. Search works identically across all three columns and never changes a task's `status`, `priority`, or `title`. When a column's filtered task list is empty, `Column` shows "No tasks match your search." instead of the normal "No tasks yet" empty state whenever a search is active, so all three columns stay visible with an accurate, non-duplicated message. No new dependency was introduced, and no drag-and-drop or other future feature was implemented.

**Follow-up search UX pass:** added a small inline SVG search icon and a keyboard-accessible clear button (`×`, shown only when the field has text) inside `SearchBar`, plus a lightweight result-count summary beneath it ("N tasks" with no search, "N task(s) found" while searching, "No tasks found. Try a different search term." when a search matches nothing) — all derived from the same `tasks`/`searchTerm` state, never a separate count. Escape now clears the search field for convenience. When the *entire* board has zero matches, the redundant "No tasks match your search." text is suppressed in each column in favor of the single summary message above the board; it still appears per-column in the ordinary case where only some columns lack a match. Styling reuses the existing lavender tokens, border radius, and focus-ring treatment — no new colors or design patterns were introduced.
