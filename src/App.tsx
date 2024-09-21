import React, { useState } from 'react'

export type TodosType = {
  id: number
  name: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<TodosType[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [isEditing, setIsEditing] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputValue.trim() === '') return

    if (isEditing !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === isEditing ? { ...todo, name: inputValue } : todo,
        ),
      )
      setIsEditing(null)
    } else {
      const newTodo: TodosType = {
        id: Date.now(),
        name: inputValue,
        completed: false,
      }
      setTodos([...todos, newTodo])
    }

    setInputValue('')
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id)
    if (todoToEdit) {
      setInputValue(todoToEdit.name)
      setIsEditing(id)
    }
  }

  return (
    <div className="flex justify-center pt-10 min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl w-full">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Todo with Typescript 
        </h2>
        <form className="flex items-center gap-4 mb-8" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            name="inputValue"
            className="flex-1 p-4 border-2 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:blue-400 transition-all"
            placeholder={isEditing ? 'Update your Todo' : 'Add a new Todo'}
          />
          <button
            type="submit"
            className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-300 font-semibold text-white ${
              isEditing
                ? 'bg-yellow-400 hover:bg-yellow-300'
                : 'bg-green-500 hover:bg-green-400'
            }`}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </form>

        <ul className="space-y-6">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-5 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <span className="text-xl font-medium text-gray-800">
                {index + 1}. {todo.name}
              </span>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 text-white font-medium bg-blue-500 rounded-lg shadow-md hover:bg-blue-400 transition-all"
                  onClick={() => handleEdit(todo.id)}
                >
                  Edit
                </button>

                <button
                  className="px-4 py-2 text-white font-medium bg-red-500 rounded-lg shadow-md hover:bg-red-400 transition-all"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
