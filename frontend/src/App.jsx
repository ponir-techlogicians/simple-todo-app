import React, { useState } from 'react'
import TodoList from './components/TodoList.jsx'
import AddTodo from './components/AddTodo.jsx'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default App
