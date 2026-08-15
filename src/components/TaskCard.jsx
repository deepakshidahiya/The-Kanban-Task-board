function TaskCard({ task, onDeleteTask }) {
  return (
    <div className="task-card">
      <p className="task-card-title">{task.title}</p>

      <div className="task-card-footer">
        <span className="task-card-priority">{task.priority}</span>
        <button
          type="button"
          className="task-card-delete"
          onClick={() => onDeleteTask(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard
