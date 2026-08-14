import TaskCard from './TaskCard'

function Column({ title, tasks }) {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>

      <div className="column-tasks">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default Column
