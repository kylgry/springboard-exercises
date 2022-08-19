import './CompanyCard.css'
import { Link } from "react-router-dom"


function CompanyCard({ company }) {

  return (
    <Link to={`/companies/${company.handle}`}>
      <div className="CompanyCard">
        <p>{ company.name }</p>
        <p>{ company.numEmployees } employees</p>
        <p>{ company.description }</p>
      </div>
    </Link>
  )
}

export default CompanyCard
