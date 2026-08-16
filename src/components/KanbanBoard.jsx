import Column from './Column'

const columns = [
  { id: 'todo', title: 'To Do', status: 'todo' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
  { id: 'done', title: 'Done', status: 'done' },
]

function KanbanBoard({
  tasks,
  onDeleteTask,
  onUpdateTaskTitle,
  isSearchActive,
  hasNoResults,
}) {
  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.status}
          title={column.title}
          tasks={tasks.filter((task) => task.status === column.status)}
          onDeleteTask={onDeleteTask}
          onUpdateTaskTitle={onUpdateTaskTitle}
          accent={column.id}
          isSearchActive={isSearchActive}
          hasNoResults={hasNoResults}
        />
      ))}
    </div>
  )
}

export default KanbanBoard
