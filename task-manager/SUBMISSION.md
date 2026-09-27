TaskFlow – Capstone Submission (AI-Assisted Development)

What I built

TaskFlow is a task manager made in React (using Vite). You can add a
task with a priority (low/medium/high), mark it done, edit it just by
double-clicking on it, delete it, and filter between All / Active /
Completed tasks. Everything gets saved in the browser's localStorage
so it doesn't disappear on refresh.

Prompts I used with the AI

I built this step by step instead of asking for everything at once.
Here's roughly what I asked:





First I asked it to set up a basic React + Vite task manager –

just add, complete and delete tasks, with localStorage so data
 doesn't get lost on refresh.



Then I asked for a priority field (low/medium/high) on each task,

shown visually somehow.



After that I asked for filter buttons – All, Active, Completed.



Then I wanted inline editing, so I asked for double-click to edit

a task's title directly.



Last, I asked it to make the styling look better – card layout,

rounded corners, some shadow, and completed tasks should look
 visually different from active ones.



How the AI helped





It gave me the whole base structure (state variables, functions,
JSX) quickly, so I didn't have to write everything from scratch.



It used crypto.randomUUID() for generating task IDs, which is
better than something like Date.now() since IDs won't clash if
you add tasks fast.



It set up the useEffect + localStorage combo for saving/loading
tasks, which I wouldn't have thought to structure this way on my
own first try.



It also gave me a starting CSS file which I tweaked further.



Things I changed / fixed myself after checking the AI's code





The first version gave every priority the same border color, which
defeated the purpose of even having priorities. I went into
App.css myself and mapped high to red, medium to orange, and low
to green.



The inline editing only saved when I pressed Enter — if I clicked
somewhere else, the input just stayed open, which felt broken. I
added an onBlur so it also saves when you click away.



I noticed I could click "Add" with an empty input and it would add
a blank task. I added a .trim() check before creating a new task
so this can't happen.



Same blank-text bug existed while editing a task, so I added the
same trim check in the edit-save function too.



The first draft tracked "is this task being edited" separately for
every task in an array, which seemed messy and would re-render
every single task on each keystroke. I simplified it to one
editingId variable that just tracks which task is currently being
edited.



How to run it

npm install
npm run dev

Then open the local link it prints (usually http://localhost:5173).
