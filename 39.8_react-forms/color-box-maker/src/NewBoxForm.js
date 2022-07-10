import React, { useState } from "react";
import './NewBoxForm.css'

function NewBoxForm({ addBox }) {

  const INITIAL_STATE = { bgColor: "", width: 0, height: 0 };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = evt => {
    evt.preventDefault();
    addBox(formData);
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
    <form onSubmit={handleSubmit} className='NewBoxForm'>

      <p>
      <label htmlFor="bgColor">color</label>
      <input
        id="bgColor"
        name="bgColor"
        value={formData.bgColor}
        onChange={handleChange}
      /></p>

      <p>
      <label htmlFor="width">width</label>
      <input
        type="number"
        id="width"
        name="width"
        value={formData.width}
        onChange={handleChange}
      /></p>

      <p>
      <label htmlFor="height">height</label>
      <input
        type="number"
        id="height"
        name="height"
        value={formData.height}
        onChange={handleChange}
      /></p>

      <button>add a new box</button>
    </form>
  )
}

export default NewBoxForm
