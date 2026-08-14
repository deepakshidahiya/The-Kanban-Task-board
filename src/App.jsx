import Header from './components/Header'
import TaskForm from './components/TaskForm'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <TaskForm />
      <KanbanBoard />
    </div>
  )
}

export default App
