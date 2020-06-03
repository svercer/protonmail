import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = () => (
  <header
    style={{
      background: `#505061`,
      
    }}
    className='d-flex justify-content-around p-3'
  >
    <Link className='text-uppercase text-white' to='/'>Home</Link>
    <Link className='text-uppercase text-white' to="/pricing">Pricing</Link>

  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
