import React, {useState} from "react";
import './Todo.css'

function Todo({ removeTodo, editTodo, toggleEditMode, editMode, text, id }) {

  const [editText, setEditText] = useState(text);

  const handleRemove = evt => {
    evt.preventDefault();
    removeTodo(id);
  };

  const handleEditMode = evt => {
    evt.preventDefault();
    toggleEditMode(id);
  };

  const handleChange = evt => {
    const { value } = evt.target;
    setEditText(editText => value);
  };

  const handleEdit = evt => {
    evt.preventDefault();
    editTodo(id, editText)
  }

  if (editMode) {
    return (
      <div className='Todo'>
      <form className='EditTodo' onSubmit={handleEdit}>
        <input
          id="text"
          name="text"
          value={editText}
          onChange={handleChange}
        />
        <button>edit task</button>
      </form>
      </div>
    )
  }

  else {
    return (
      <div className='Todo'>
      {text}
      <button onClick={handleRemove}>del</button>
      <button onClick={handleEditMode}>edit</button>
      </div>
    )
  }

}

export default Todo
