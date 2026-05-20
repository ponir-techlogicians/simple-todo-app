import React, { useState } from 'react'

function AddTodo({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Add todo form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default AddTodo
