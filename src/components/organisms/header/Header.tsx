import Logo from '@atoms/logo/Logo';
import HamburgerMenu from '@svgs/menu.svg';

function Header() {
	return (
		<div className="headerWrapper">
			<Logo size={`mid`} />
			<HamburgerMenu />
		</div>
	);
}

export default Header;
