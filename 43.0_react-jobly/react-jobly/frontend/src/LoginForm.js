import './LoginForm.css'
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"


function LoginForm({ login }) {

  const INITIAL_STATE = {
    username: "",
    password: ""
  }

  const navigate = useNavigate()
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState([])

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    let res = await login(formData)
    if (res.success) {
      navigate("/companies")
    }
    else {
      setErrors(res.errors)
    }
    setFormData(INITIAL_STATE)
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }))
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input name="username" id="username" placeholder="username" value={formData.username} onChange={handleChange} />
        <input type="password" name="password" id="password" placeholder="password" value={formData.password} onChange={handleChange} />
        <button>login</button>
      </form>
      { errors.length ? <div className="error">{ errors }</div> : null }
    </div>
  )
}

export default LoginForm
