import React from "react"
import { NavLink } from "react-router-dom"
import './Navigation.css'
import { useNavigate } from "react-router-dom"

function Navigation({ user, logout }) {

  const navigate = useNavigate()

  const logoutAndRedirect = () => {
    logout()
    navigate("/")
  }
  
  return (
    <div className="Navigation">
      <NavLink to="/">Jobly</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
      { user ?
        <>
          <NavLink to="/profile">Profile</NavLink>
          <button className="nav" onClick={logoutAndRedirect}>Logout</button>
        </> :
        <>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      }
    </div>
  )
}

export default Navigation
