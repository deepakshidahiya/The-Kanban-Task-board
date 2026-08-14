import Column from './Column'

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [{ id: 1, title: 'Sample Task', priority: 'Medium' }],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [],
  },
]

function KanbanBoard() {
  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <Column key={column.id} title={column.title} tasks={column.tasks} />
      ))}
    </div>
  )
}

export default KanbanBoard
