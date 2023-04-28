import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import {BiNavigation} from 'react-icons/bi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants,
    jobDetails: [],
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const dataJobDetails = data.job_details
    if (response.ok === true) {
      const updatedJobDetails = {
        companyLogoUrl: dataJobDetails.company_logo_url,
        companyWebsiteUrl: dataJobDetails.company_website_url,
        employmentType: dataJobDetails.employment_type,
        id: dataJobDetails.id,
        jobDescription: dataJobDetails.job_description,
        lifeAtCompanyDescription: dataJobDetails.life_at_company.description,
        lifeAtCompanyImageUrl: dataJobDetails.life_at_company.image_url,
        location: dataJobDetails.location,
        packagePerAnnum: dataJobDetails.package_per_annum,
        rating: dataJobDetails.rating,
        title: dataJobDetails.title,
      }

      const updatedSkills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        skills: updatedSkills,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickJobRetryButton = () => this.getJobDetails

  renderView = () => {
    const {jobDetails, similarJobs, skills} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
    } = jobDetails
    return (
      <>
        <Header />
        <div className="job-details-container">
          <div className="job-card-container">
            <div className="company-name-role-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
            <div className="description-container">
              <h1 className="description-details-heading">Description</h1>
              <div className="visit-link-container">
                <a href={companyWebsiteUrl} className="visit">
                  Visit
                </a>
                <BiNavigation className="nav-icon" />
              </div>
            </div>
            <p className="job-details-description">{jobDescription}</p>
            <ul className="skills-container">
              <h1 className="description-details-heading">Skills</h1>
              {skills.map(eachSkill => (
                <li className="list">
                  <img
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                    className="skill-img"
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="description-details-heading">Life at Company</h1>
            <p className="job-details-description">
              {lifeAtCompanyDescription}
            </p>
            <img
              src={lifeAtCompanyImageUrl}
              alt="life at company"
              className="life-at-company"
            />
          </div>
          <ul>
            <h1 className="similar-jobs">Similar Jobs</h1>
            {similarJobs.map(eachSimilar => (
              <SimilarJobs eachSimilar={eachSimilar} key={eachSimilar.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <>
      <Header />
      <div className="job-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view"
        />
        <h1 className="description-details-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="job-details-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={this.onClickJobRetryButton}
        >
          Retry
        </button>
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderView()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default JobDetails
