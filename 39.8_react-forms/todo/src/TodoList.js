import React, { useState } from "react";
import Todo from './Todo'
import NewTodoForm from './NewTodoForm'
import { v4 as uuid } from "uuid";
import './TodoList.css'

function TodoList() {

  const [todos, setTodos] = useState([])

  const addTodo = todo => {
    let newTodo = { ...todo, id: uuid(), editMode: false }
    setTodos(todos => [...todos, newTodo])
  };

  const removeTodo = id => {
    setTodos(todos => [...todos.filter(todo => todo.id !== id)])
  };

  const editTodo = (id, newText) => {
    setTodos(todos => [...todos.filter(todo => todo.id !== id), {text: newText, editMode: false, id: id}])
  }

  const toggleEditMode = id => {
    const todoToEdit = todos.filter(todo => todo.id === id)[0]
    todoToEdit.editMode = true
    setTodos(todos => [...todos.filter(todo => todo.id !== id), todoToEdit])
  }

  return (
    <div className="TodoList">
      <NewTodoForm addTodo={ addTodo } />
      { todos.map(todo =>
        <Todo
          removeTodo={ removeTodo }
          editTodo={ editTodo }
          toggleEditMode={ toggleEditMode }
          text={todo.text}
          editMode={todo.editMode}
          id={todo.id}
          key={todo.id}
        />)
      }
    </div>

  )
}

export default TodoList
