const MOVE_OPTIONS = {
  todo: [{ status: 'in-progress', label: 'Move to In Progress' }],
  'in-progress': [
    { status: 'todo', label: 'Move to To Do' },
    { status: 'done', label: 'Move to Done' },
  ],
  done: [{ status: 'in-progress', label: 'Move to In Progress' }],
}

function TaskCard({ task, onDeleteTask, onMoveTask }) {
  const moveOptions = MOVE_OPTIONS[task.status] ?? []

  return (
    <div className="task-card">
      <p className="task-card-title">{task.title}</p>

      {moveOptions.length > 0 && (
        <div className="task-card-moves">
          {moveOptions.map((option) => (
            <button
              key={option.status}
              type="button"
              className="task-card-move"
              onClick={() => onMoveTask(task.id, option.status)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="task-card-footer">
        <span className="task-card-priority">Priority: {task.priority}</span>
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
