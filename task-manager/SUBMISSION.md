# TaskFlow — AI-Assisted Development Submission

## 1. What this app does
A React (Vite) task manager: add tasks with a priority level, mark them
complete, edit inline (double-click a task), delete tasks, filter by
All / Active / Completed, and persist everything in `localStorage`.

## 2. Prompts used during development
These are the prompts given to Claude to build this app step by step:

1. "Build a simple React task manager with Vite — add, complete, delete
   tasks, and save them to localStorage."
2. "Add a priority field (low/medium/high) to each task and show it as
   a colored badge or border on the task item."
3. "Add filtering — All / Active / Completed — with buttons above the
   task list."
4. "Let me edit a task's title inline by double-clicking it, and save
   on blur or Enter."
5. "Clean up the styling — card layout, rounded corners, a subtle
   shadow, and a clear visual difference between completed and active
   tasks."

## 3. How AI assisted
- Generated the initial component structure (state, handlers, JSX)
  in one pass, which saved time versus writing boilerplate by hand.
- Suggested using `crypto.randomUUID()` for task IDs instead of
  `Date.now()`, which avoids ID collisions when adding tasks quickly.
- Proposed the `useEffect` + `localStorage` pattern for persistence
  so tasks survive a page refresh.
- Wrote the base CSS (spacing, colors, layout) which I then adjusted
  to match my own preferences.

## 4. Manual improvements / corrections made after reviewing AI code
- **Priority border colors**: the first AI draft used the same border
  color for all priorities. I manually mapped `high → red`,
  `medium → orange`, `low → green` in `App.css` so priority is visible
  at a glance.
- **Edit UX**: the AI's first inline-edit version only saved on Enter
  and left the field open if you clicked away, which felt buggy. I
  added an `onBlur` handler so the edit also saves when focus leaves
  the input.
- **Empty input guard**: the initial `addTask` function let you add
  blank tasks by pressing Add with an empty field. I added
  `title.trim()` validation before creating the task.
- **Trimmed edit titles**: same issue existed in `saveEdit` — added a
  `trimmed` check there too so an edit can't be saved as blank text.
- **Removed unused state**: an early AI draft kept a separate
  `isEditing` boolean per task in an array; I refactored this to a
  single `editingId` value on the parent component, which is simpler
  and avoids re-rendering every task on each keystroke.

## 5. How to run
```
npm install
npm run dev
```
Then open the printed local URL (usually `http://localhost:5173`).
