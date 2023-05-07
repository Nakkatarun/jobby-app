import './index.css'

const EmploymentType = props => {
  const {eachType, updatedEmploymentType} = props
  const {label} = eachType

  const onChangeEmploymentType = event => {
    updatedEmploymentType(event.target.value)
  }

  return (
    <li className="employment-type-container">
      <input
        id="checkbox"
        type="checkbox"
        value={label}
        onClick={onChangeEmploymentType}
      />
      <label htmlFor="checkbox" className="label-text">
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
