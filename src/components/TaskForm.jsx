function TaskForm() {
  return (
    <form className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        className="task-form-input"
      />

      <select name="priority" className="task-form-select" defaultValue="Medium">
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
