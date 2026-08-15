import TaskCard from './TaskCard'

function Column({ title, tasks, onDeleteTask }) {
  return (
    <div className="column">
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </div>

      <div className="column-tasks">
        {tasks.length === 0 ? (
          <div className="column-empty">
            <p className="column-empty-title">No tasks yet</p>
            <p className="column-empty-subtitle">
              Add a task above to get started.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} />
          ))
        )}
      </div>
    </div>
  )
}

export default Column
