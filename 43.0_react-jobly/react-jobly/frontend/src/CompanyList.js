import './CompanyList.css'
import React, { useState, useEffect } from "react"
import JoblyApi from './Api'
import CompanyCard from './CompanyCard'


function CompanyList() {

  const INITIAL_STATE = { name: "" }
  const [companies, setCompanies] = useState([])
  const [formData, setFormData] = useState(INITIAL_STATE)

  const getCompanies = async (query={}) => {
    let companies = await JoblyApi.getCompanies(query)
    setCompanies(companies)
  }


  const handleSubmit = evt => {
    evt.preventDefault()
    // i think better to do this in the back end, but
    // for the assignment i didn't want to edit back end
    // api throws error if name parameter is sent empty
    if (formData.name !== "") { getCompanies(formData) }
    else { getCompanies() }
    setFormData(INITIAL_STATE)
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }))
  }

  useEffect(() => { getCompanies() }, [])

  return (
    <div className="CompanyList">
      <form onSubmit={handleSubmit}>
        <input name="name" id="name" placeholder="filter by name" value={formData.name} onChange={handleChange} />
      </form>
      {companies.map(c => (<CompanyCard company={c} key={c.handle}/>))}
    </div>
  )
}

export default CompanyList
