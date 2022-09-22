import React from 'react'
import './navbar.scss'
import logo from '../../assets/Logo.svg'

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className="container">
				<div className="navbar__wrapper">
					<a href="./" className="navbar__logo-link">
						<img src={logo} alt="Logo" className="navbar__logo-img" />
					</a>
					<div className="navbar__buttons">
						<button className="button">Users</button>
						<button className="button">Sign up</button>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;