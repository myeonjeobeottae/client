import Logo from '@atoms/logo/Logo';
import Login from '@molecules/login';
import React from 'react';
import { AuthContext } from 'context/Auth';
import { useContext } from 'react';
import Profile from '@molecules/profile/Profile';

function Header() {
	const authService = useContext(AuthContext);
	const user = authService?.getCurrentUser();

	return (
		<header className="headerWrapper">
			<Logo size={`mid`} />
			{user ? <Profile user={user} /> : <Login />}
		</header>
	);
}

export default Header;
