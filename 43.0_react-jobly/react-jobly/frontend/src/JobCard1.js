import './JobCard.css'
import { Link } from "react-router-dom"


function JobCard1({ job }) {

  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="JobCard">
        <p>{ job.title } at { job.companyName }</p>
        <p>${ job.salary } per year and { job.equity } equity</p>
      </div>
    </Link>
  )
}

export default JobCard1
