import Logo from '@atoms/logo/Logo';
import Button from '@atoms/button/Button';
import Hamburger from '@svgs/menu.svg';

function Header() {
	return (
		<div className="headerWrapper">
			<Logo size={`mid`} />
			<Button className="hamburgerBtn" type="button">
				<Hamburger />
			</Button>
		</div>
	);
}

export default Header;
