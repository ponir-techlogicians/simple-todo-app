import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App.jsx'

describe('App', () => {
  test('renders the heading', () => {
    render(<App />)
    expect(screen.getByText('Todo App')).toBeInTheDocument()
  })

  test('shows empty state message when no todos', () => {
    render(<App />)
    expect(screen.getByText('No tasks yet. Add one above.')).toBeInTheDocument()
  })

  test('adds a todo when form is submitted', () => {
    render(<App />)
    const input = screen.getByLabelText('New todo')
    fireEvent.change(input, { target: { value: 'Buy milk' } })
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  test('clears input after adding a todo', () => {
    render(<App />)
    const input = screen.getByLabelText('New todo')
    fireEvent.change(input, { target: { value: 'Buy milk' } })
    fireEvent.click(screen.getByText('Add'))
    expect(input.value).toBe('')
  })

  test('does not add empty todo', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Add'))
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  test('deletes a todo', () => {
    render(<App />)
    const input = screen.getByLabelText('New todo')
    fireEvent.change(input, { target: { value: 'Buy milk' } })
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByLabelText('Delete "Buy milk"'))
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })

  test('toggles a todo completion', () => {
    render(<App />)
    const input = screen.getByLabelText('New todo')
    fireEvent.change(input, { target: { value: 'Buy milk' } })
    fireEvent.click(screen.getByText('Add'))
    const checkbox = screen.getByLabelText('Mark "Buy milk" as complete')
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
