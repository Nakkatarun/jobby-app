import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import Header from '../Header'
import EmploymentType from '../EmploymentType'
import SalaryRanges from '../SalaryRanges'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Jobs extends Component {
  state = {
    activeEmploymentId: employmentTypesList[0].employmentTypeId,
    activeSalaryId: salaryRangesList[0].salaryRangeId,
    jobDetailsList: [],
    apiStatus: apiStatusConstants.initial,
    inputValue: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeEmploymentId, activeSalaryId, inputValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentId}&minimum_package=${activeSalaryId}&search=${inputValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedJobDetails = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetailsList: updatedJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setStatus({apiStatus: apiStatusConstants.failure})
    }
  }

  updatedEmploymentType = activeEmploymentId => {
    this.setState({activeEmploymentId}, this.getJobsList)
  }

  updatedSalaryRange = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobsList)
  }

  onSearchInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onClickSearchButton = () => {
    const {jobDetailsList, inputValue} = this.state
    const filteredJobs = jobDetailsList.filter(eachJob =>
      eachJob.title.toLowerCase().includes(inputValue.toLowerCase()),
    )

    this.setState({jobDetailsList: filteredJobs})
  }

  renderNoJobsView = () => (
    <div className="no-job-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  jobDetailsRender = () => {
    const {jobDetailsList, apiStatus} = this.state
    return (
      <>
        {jobDetailsList.map(eachJobDetails => (
          <JobCard
            eachJobDetails={eachJobDetails}
            key={eachJobDetails.id}
            apiStatus={apiStatus}
          />
        ))}
      </>
    )
  }

  render() {
    const {
      activeEmploymentId,
      activeSalaryId,
      jobDetailsList,
      inputValue,
    } = this.state
    const condition = jobDetailsList.length !== 0
    return (
      <>
        <Header />
        <div className="jobs-body-container">
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onSearchInput}
              value={inputValue}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.onClickSearchButton}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <Profile />
          <hr className="line" />
          <h1 className="category-text">Type of Employment</h1>
          {employmentTypesList.map(eachType => (
            <EmploymentType
              eachType={eachType}
              activeEmploymentId={activeEmploymentId}
              key={eachType.employmentTypeId}
              updatedEmploymentType={this.updatedEmploymentType}
            />
          ))}
          <hr className="line" />
          <h1 className="category-text">Salary Range</h1>
          {salaryRangesList.map(eachSalary => (
            <SalaryRanges
              activeSalaryId={activeSalaryId}
              eachSalary={eachSalary}
              key={eachSalary.salaryRangeId}
              updatedSalaryRange={this.updatedSalaryRange}
            />
          ))}
          <hr className="line" />
          {condition ? this.jobDetailsRender() : this.renderNoJobsView()}
        </div>
      </>
    )
  }
}
export default Jobs
