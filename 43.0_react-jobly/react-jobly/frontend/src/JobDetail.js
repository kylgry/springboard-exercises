import './JobDetail.css'
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import JoblyApi from './Api'

function JobDetail() {

  const { id } = useParams()

  const [job, setJob] = useState([])

  useEffect(() => {
    const getJob = async () =>  {
      setJob(await JoblyApi.getJob(id))
    }
    getJob()
  }, [id])

  return (
    <div className="JobDetail">
      <p>{ job.title }</p>
      <p>{ job.salary }</p>
      <p>{ job.equity } equity</p>
    </div>
  )
}

export default JobDetail
