import './SignupForm.css'
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignupForm({ signup }) {

  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  }

  const navigate = useNavigate()
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState([])

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    let res = await signup(formData)
    if (res.success) {
      // setFormData(INITIAL_STATE)
      navigate("/companies")
    }
    else {
      setErrors(res.errors)
    }

  }

  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(fData => ({ ...fData, [name]: value }))
  }

  return (
    <div className="SignupForm">
      <form onSubmit={handleSubmit}>
        <input name="username" id="username" placeholder="username" value={formData.username} onChange={handleChange} />
        <input type="password" name="password" id="password" placeholder="password" value={formData.password} onChange={handleChange} />
        <input name="firstName" id="firstName" placeholder="first name" value={formData.firstName} onChange={handleChange} />
        <input name="lastName" id="lastName" placeholder="last name" value={formData.lastName} onChange={handleChange} />
        <input name="email" id="email" placeholder="email" value={formData.email} onChange={handleChange} />
        <button>register</button>
      </form>
      { errors.length ? <div className="error">{ errors }</div> : null }
    </div>
  )
}

export default SignupForm
