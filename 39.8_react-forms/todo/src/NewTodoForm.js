import React, { useState } from "react";
import './NewTodoForm.css'

function NewTodoForm({ addTodo }) {

  const INITIAL_STATE = { text:"" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = evt => {
    evt.preventDefault();
    addTodo(formData);
    setFormData(INITIAL_STATE);
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className='NewTodoForm'>

      <input
        id="text"
        name="text"
        value={formData.text}
        onChange={handleChange}
      />
      <button>add task</button>
    </form>
  )
}

export default NewTodoForm
