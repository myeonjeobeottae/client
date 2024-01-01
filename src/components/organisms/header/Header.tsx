import Logo from '@atoms/logo/Logo';
import Login from '@molecules/login';
import React from 'react';

function Header() {
	return (
		<header className="headerWrapper">
			<Logo size={`mid`} />
			<Login />
		</header>
	);
}

export default React.memo(Header);
