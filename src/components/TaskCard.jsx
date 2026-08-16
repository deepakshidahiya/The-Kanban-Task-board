import { useEffect, useRef, useState } from 'react'

const MOVE_OPTIONS = {
  todo: [{ status: 'in-progress', label: 'Move to In Progress' }],
  'in-progress': [
    { status: 'todo', label: 'Move to To Do' },
    { status: 'done', label: 'Move to Done' },
  ],
  done: [{ status: 'in-progress', label: 'Move to In Progress' }],
}

function TaskCard({ task, onDeleteTask, onMoveTask, onUpdateTaskTitle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const editButtonRef = useRef(null)
  const shouldRefocusEditButton = useRef(false)

  const moveOptions = MOVE_OPTIONS[task.status] ?? []
  const errorId = `task-error-${task.id}`
  const priorityClass = `priority-${task.priority.toLowerCase()}`

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    } else if (shouldRefocusEditButton.current) {
      shouldRefocusEditButton.current = false
      editButtonRef.current?.focus()
    }
  }, [isEditing])

  function startEditing() {
    setEditedTitle(task.title)
    setError('')
    setIsEditing(true)
  }

  function saveEdit() {
    if (!isEditing) return

    const trimmedTitle = editedTitle.trim()
    if (!trimmedTitle) {
      setError('Task title cannot be empty.')
      return
    }

    onUpdateTaskTitle(task.id, trimmedTitle)
    shouldRefocusEditButton.current = true
    setIsEditing(false)
    setError('')
  }

  function cancelEdit() {
    if (!isEditing) return

    setEditedTitle(task.title)
    setError('')
    shouldRefocusEditButton.current = true
    setIsEditing(false)
  }

  function handleTitleChange(event) {
    setEditedTitle(event.target.value)
    if (error) setError('')
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      saveEdit()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      cancelEdit()
    }
  }

  return (
    <div
      className={`task-card ${priorityClass}${isEditing ? ' task-card--editing' : ''}`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="task-card-edit-input"
          value={editedTitle}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          aria-label={`Edit title for ${task.title}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <p className="task-card-title">{task.title}</p>
      )}

      {error && (
        <p id={errorId} className="task-card-edit-error" role="alert">
          {error}
        </p>
      )}

      {moveOptions.length > 0 && (
        <div className="task-card-moves">
          {moveOptions.map((option) => (
            <button
              key={option.status}
              type="button"
              className="task-card-btn task-card-btn--secondary"
              onClick={() => onMoveTask(task.id, option.status)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="task-card-footer">
        <span className="task-card-priority">Priority: {task.priority}</span>

        <div className="task-card-actions">
          {isEditing ? (
            <>
              <button
                type="button"
                className="task-card-btn task-card-btn--primary"
                onClick={saveEdit}
                aria-label={`Save changes to ${task.title}`}
              >
                Save
              </button>
              <button
                type="button"
                className="task-card-btn task-card-btn--tertiary"
                onClick={cancelEdit}
                aria-label={`Cancel editing ${task.title}`}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              ref={editButtonRef}
              type="button"
              className="task-card-btn task-card-btn--primary"
              onClick={startEditing}
              aria-label={`Edit ${task.title}`}
            >
              Edit
            </button>
          )}
          <button
            type="button"
            className="task-card-btn task-card-btn--danger"
            onClick={() => onDeleteTask(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
