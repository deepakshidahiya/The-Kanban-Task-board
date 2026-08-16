import TaskCard from './TaskCard'

function Column({
  title,
  tasks,
  onDeleteTask,
  onMoveTask,
  onUpdateTaskTitle,
  accent,
  isSearchActive,
  hasNoResults,
}) {
  return (
    <div className={`column${accent ? ` column--${accent}` : ''}`}>
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </div>

      <div className="column-tasks">
        {tasks.length === 0 ? (
          isSearchActive && hasNoResults ? null : (
            <div className="column-empty">
              {isSearchActive ? (
                <p className="column-empty-title">No tasks match your search.</p>
              ) : (
                <>
                  <p className="column-empty-title">No tasks yet</p>
                  <p className="column-empty-subtitle">
                    Add a task above to get started.
                  </p>
                </>
              )}
            </div>
          )
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onMoveTask={onMoveTask}
              onUpdateTaskTitle={onUpdateTaskTitle}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Column
