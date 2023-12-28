import Logo from '@atoms/logo/Logo';
import Login from '@molecules/login';

function Header() {
	return (
		<header className="headerWrapper">
			<Logo size={`mid`} />
			<Login />
		</header>
	);
}

export default Header;
