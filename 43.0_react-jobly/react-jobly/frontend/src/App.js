import './App.css'
import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navigation from './Navigation'
import Home from './Home'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'
import JobList from './JobList'
import JobDetail from './JobDetail'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Profile from './Profile'
import useLocalStorage from './hooks/useLocalStorage'
import JoblyApi from './Api'
import { decodeToken } from "react-jwt"


function App() {

  const [token, setToken] = useLocalStorage('token')
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)


  const login = async(user) => {
    try {
      let res = await JoblyApi.login(user)
      setToken(res.token)
      return { success: true }
    } catch (errors) {
      console.error("login failure", errors)
      return { success: false, errors }
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const signup = async(user) => {
    try {
      let res = await JoblyApi.register(user)
      setToken(res.token)
      return { success: true }
    } catch (errors) {
      console.error("signup failure", errors)
      return { success: false, errors }
    }
  }

  const updateProfile = async(data, user) => {
    try {
      let res = await JoblyApi.updateProfile(data, user)
      return { success: true }
    } catch(errors) {
      console.error("failure to update profile", errors)
      return { success: false, errors }
    }
  }

  useEffect(() => {
    const loadUser = () => {
      if (token) {
        JoblyApi.token = token
        const decodedToken = decodeToken(token)
        setUser(decodedToken.username)
      }
    }
    loadUser()
    setLoaded(true)
  }, [token])

  if (!loaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation user={user} logout={logout} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/companies" element={<CompanyList />} />
          <Route exact path="/companies/:name" element={<CompanyDetail />} />
          <Route exact path="/jobs" element={<JobList />} />
          <Route exact path="/jobs/:id" element={<JobDetail />} />
          <Route exact path="/login" element={<LoginForm login={login} />} />
          <Route exact path="/signup" element={<SignupForm signup={signup} />} />
          <Route exact path="/profile" element={<Profile user={user} updateProfile={updateProfile} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
