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

  return (
    <div className="app">
      <Header />
      <TaskForm onAddTask={addTask} />
      <KanbanBoard tasks={tasks} />
    </div>
  )
}

export default App
