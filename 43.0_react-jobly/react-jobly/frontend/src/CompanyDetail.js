import './CompanyDetail.css'
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import JoblyApi from './Api'
import Loading from './Loading'
import JobCard2 from './JobCard2'

function CompanyDetail() {

  const { name } = useParams()
  const [company, setCompany] = useState(null)

  useEffect(() => {
    const getCompany = async () =>  { setCompany(await JoblyApi.getCompany(name)) }
    getCompany()
  }, [name])

  if (!company) return <Loading />

  return (
    <div className="CompanyDetail">
      <p>{ company.name }</p>
      <p>{ company.numEmployees } employees</p>
      <p>{ company.description }</p>
      { company.jobs.map(j => <JobCard2 job={j} key={j.id} /> ) }

    </div>
  )
}

export default CompanyDetail
