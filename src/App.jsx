import { useState } from 'react'
import './App.css'

export default function Todolist () {

  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])

  const addTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([...todos, {id: Date.now(), text: inputText.trim(), completed: false}])
      setInputText('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }


  return (
    <div className="todo-app">
      <div className="todo-header">
        <h1>Todo List</h1>
      </div>
      
      <div className="todo-input-container">
        <input 
          type="text" 
          className="todo-input"
          placeholder="What needs to be done?"
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p className="empty-state-text">No todos yet. Add one above!</p>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input 
                type="checkbox" 
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button 
                className="delete-button" 
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
