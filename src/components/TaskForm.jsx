import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    onAddTask({ title: trimmedTitle, priority })
    setTitle('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task title"
        className="task-form-input"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        name="priority"
        className="task-form-select"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button type="submit" className="task-form-button">
        Add Task
      </button>
    </form>
  )
}

export default TaskForm
