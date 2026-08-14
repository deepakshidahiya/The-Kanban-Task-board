function TaskCard({ task }) {
  return (
    <div className="task-card">
      <p className="task-card-title">{task.title}</p>
      <span className="task-card-priority">{task.priority}</span>
    </div>
  )
}

export default TaskCard
