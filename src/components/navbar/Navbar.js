import React from 'react'
import './navbar.scss'
import logo from '../../assets/img/Logo.svg'

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className="container">
				<div className="navbar__wrapper">
					<a href="./" className="navbar__logo-link">
						<img src={logo} alt="Logo" className="navbar__logo-img" />
					</a>
					<div className="navbar__buttons">
						<a href='#workers' className="button">Users</a>
						<a href='#form-section' className="button">Sign up</a>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;