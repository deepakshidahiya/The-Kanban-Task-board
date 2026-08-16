import { useEffect, useRef, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'

function TaskCard({ task, onDeleteTask, onUpdateTaskTitle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const editButtonRef = useRef(null)
  const shouldRefocusEditButton = useRef(false)

  const errorId = `task-error-${task.id}`
  const priorityClass = `priority-${task.priority.toLowerCase()}`

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { status: task.status },
    disabled: isEditing,
  })

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
      ref={setNodeRef}
      className={`task-card ${priorityClass}${isEditing ? ' task-card--editing' : ''}${
        isDragging ? ' task-card--dragging' : ''
      }`}
      {...(!isEditing ? attributes : {})}
      {...(!isEditing ? listeners : {})}
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
