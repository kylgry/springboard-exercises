import './JobList.css'
import React, { useState, useEffect } from "react"
import JoblyApi from './Api'
import JobCard1 from './JobCard1'

function JobList() {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getJobs = async () => { setJobs(await JoblyApi.getJobs()) }
    getJobs()
  }, [])

  return (
    <div className="JobList">
      {jobs.map(job => (<JobCard1 job={job} key={job.id} />))}
    </div>
  )
}

export default JobList
