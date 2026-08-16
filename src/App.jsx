import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])

  function addTask({ title, priority }) {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      status: 'todo',
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  function moveTask(taskId, newStatus) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  function updateTaskTitle(taskId, newTitle) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    )
  }

  return (
    <div className="app">
      <Header />
      <TaskForm onAddTask={addTask} />
      <KanbanBoard
        tasks={tasks}
        onDeleteTask={deleteTask}
        onMoveTask={moveTask}
        onUpdateTaskTitle={updateTaskTitle}
      />
    </div>
  )
}

export default App
