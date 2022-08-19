import './JobCard.css'
import { Link } from "react-router-dom"


function JobCard2({ job }) {

  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="JobCard">
        <p>{ job.title }</p>
        <p>${ job.salary } per year and { job.equity } equity</p>
      </div>
    </Link>
  )
}

export default JobCard2
