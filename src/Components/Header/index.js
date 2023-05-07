import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut, FiShoppingBag} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-bar-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="header-logo"
        />
      </Link>

      <ul className="header-options-container">
        <Link to="/">
          <li className="list-type">
            <AiFillHome className="icons" />
          </li>
        </Link>
        <Link to="/jobs">
          <li className="list-type">
            <FiShoppingBag className="icons" />
          </li>
        </Link>
        <li className="list-type">
          <button
            type="button"
            className="log-out-button"
            onClick={onClickLogout}
          >
            <FiLogOut className="icons" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
