import './index.css'

const SalaryRanges = props => {
  const {eachSalary, updatedSalaryRange} = props
  const {label} = eachSalary

  const onChangeSalaryId = event => {
    updatedSalaryRange(event.target.value)
  }

  return (
    <li className="salary-type-container">
      <input id="radio" type="radio" value={label} onClick={onChangeSalaryId} />
      <label htmlFor="radio" className="label-text">
        {label}
      </label>
    </li>
  )
}

export default SalaryRanges
