import { useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
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
  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  )

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

  function handleDragStart(event) {
    const task = tasks.find((item) => item.id === event.active.id)
    setActiveTask(task ?? null)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveTask(null)
    if (!over) return

    const newStatus = over.id
    if (active.data.current?.status !== newStatus) {
      moveTask(active.id, newStatus)
    }
  }

  function handleDragCancel() {
    setActiveTask(null)
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <KanbanBoard
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          onUpdateTaskTitle={updateTaskTitle}
          isSearchActive={isSearchActive}
          hasNoResults={hasNoResults}
        />

        <DragOverlay>
          {activeTask ? (
            <div
              className={`task-card priority-${activeTask.priority.toLowerCase()} task-card--overlay`}
            >
              <p className="task-card-title">{activeTask.title}</p>
              <div className="task-card-footer">
                <span className="task-card-priority">
                  Priority: {activeTask.priority}
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default App
