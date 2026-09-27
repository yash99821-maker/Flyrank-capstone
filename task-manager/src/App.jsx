import { useState, useEffect } from 'react';
import './App.css';

const STORAGE_KEY = 'taskflow_tasks';

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmed,
      priority,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setTitle('');
    setPriority('medium');
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditTitle(task.title);
  }

  function saveEdit(id) {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditingId(null);
      return;
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t))
    );
    setEditingId(null);
  }

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <h1>TaskFlow</h1>
      <p className="subtitle">{remaining} task(s) remaining</p>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={filter === f ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="task-list">
        {visibleTasks.length === 0 && (
          <li className="empty">No tasks here.</li>
        )}
        {visibleTasks.map((task) => (
          <li key={task.id} className={`task priority-${task.priority}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            {editingId === task.id ? (
              <input
                className="edit-input"
                value={editTitle}
                autoFocus
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => saveEdit(task.id)}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
              />
            ) : (
              <span
                className={task.completed ? 'task-title done' : 'task-title'}
                onDoubleClick={() => startEdit(task)}
              >
                {task.title}
              </span>
            )}

            <span className="badge">{task.priority}</span>
            <button className="icon-btn" onClick={() => startEdit(task)}>
              ✎
            </button>
            <button className="icon-btn" onClick={() => deleteTask(task.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
