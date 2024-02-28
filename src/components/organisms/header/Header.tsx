import Logo from '@atoms/logo/Logo';
import Login from '@molecules/login';
import React from 'react';
import { AuthContext } from 'context/Auth';
import { useContext } from 'react';
import Profile from '@molecules/profile/Profile';

function Header() {
	const authService = useContext(AuthContext);
	const user = authService?.getCurrentUser();
	const isLoginPage = window.location.pathname === '/login';

	return (
		<header className="headerWrapper">
			<Logo size={`mid`} />
			{!isLoginPage ? user ? <Profile user={user} /> : <Login /> : null}
		</header>
	);
}

export default Header;
