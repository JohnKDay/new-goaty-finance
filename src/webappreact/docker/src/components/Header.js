import React from 'react';

const Header = () => {
	return (
		<nav className="navbar-fixed">
				<div className="nav-wrapper grey darken-2">
					<a href="/" className="brand-logo">
						<i className="fa fa-line-chart material-icons" aria-hidden="true" />
						Stock Market Insights 
					</a>
				</div>
		</nav>
	);
};

export default Header;
