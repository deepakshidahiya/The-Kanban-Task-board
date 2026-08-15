import Column from './Column'

const columns = [
  { id: 'todo', title: 'To Do', status: 'todo' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
  { id: 'done', title: 'Done', status: 'done' },
]

function KanbanBoard({ tasks, onDeleteTask }) {
  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          tasks={tasks.filter((task) => task.status === column.status)}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default KanbanBoard
