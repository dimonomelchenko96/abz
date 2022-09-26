import React from 'react'
import Navbar from '../navbar/Navbar';

import './header.scss'

const Header = () => {
	return (
		<header className='header'>
			<Navbar/>
			<div className="header__wrapper">
				<h1 className="header__title">
					Test assignment for front-end developer
				</h1>
				<p className="header__subtitle">
					What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
				</p>
				<a href='#form-section' className="button">Sign up</a>
			</div>
		</header>
	)
}

export default Header;