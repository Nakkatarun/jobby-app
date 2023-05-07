import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {eachJobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-card-container">
        <div className="company-name-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="role-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="salary-location-employment-container">
          <div className="location-employment-container">
            <GoLocation className="icon" />
            <p className="location">{location}</p>
            <BsBriefcase className="icon" />
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="job-line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
