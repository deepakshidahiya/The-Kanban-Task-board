import { useEffect, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import SearchBar from './components/SearchBar'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

const STORAGE_KEY = 'kanbanTasks'

function loadStoredTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(loadStoredTasks)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

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

  const trimmedSearch = searchTerm.trim().toLowerCase()
  const isSearchActive = trimmedSearch.length > 0
  const filteredTasks = isSearchActive
    ? tasks.filter((task) => task.title.toLowerCase().includes(trimmedSearch))
    : tasks
  const hasNoResults = isSearchActive && filteredTasks.length === 0

  return (
    <div className="app">
      <Header />
      <TaskForm onAddTask={addTask} />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCount={tasks.length}
        resultCount={filteredTasks.length}
        isSearchActive={isSearchActive}
      />
      <KanbanBoard
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onMoveTask={moveTask}
        onUpdateTaskTitle={updateTaskTitle}
        isSearchActive={isSearchActive}
        hasNoResults={hasNoResults}
      />
    </div>
  )
}

export default App
