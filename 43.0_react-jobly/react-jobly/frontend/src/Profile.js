import './Profile.css'
import React, { useState, useEffect } from "react"
import JoblyApi from './Api'

function Profile({ updateProfile, user }) {

  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: ""
  }

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    console.log(user)
    let res = await updateProfile(formData, user)
    if (res.success) {
      setMessage('Profile successfully updated.')
    }
    else {
      setErrors(res.errors)
    }
  }

  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(fData => ({ ...fData, [name]: value }))
  }

  useEffect(() => {
    const getUser = async () => {
      const res = await JoblyApi.getUser(user)
      setFormData(fData => ({ ...fData,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          email: res.user.email
        })
      )
    }
    getUser()
  },[user])

  return (
    <div className="Profile">
    <form onSubmit={handleSubmit}>
      <input name="firstName" id="firstName" placeholder="first name" value={formData.firstName} onChange={handleChange} />
      <input name="lastName" id="lastName" placeholder="last name" value={formData.lastName} onChange={handleChange} />
      <input name="email" id="email" placeholder="email" value={formData.email} onChange={handleChange} />
      <button>update profile</button>
    </form>
    { message ? <div className="message">{ message }</div> : null }
    { errors ? <div className="error">{ errors }</div> : null }
    </div>
  )
}

export default Profile
