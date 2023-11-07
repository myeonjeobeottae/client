import Logo from '@atoms/logo/Logo';
import Button from '@atoms/button/Button';
import Hamburger from '@svgs/menu.svg';

function Header() {
	const REST_API_KEY = '8bf32c7eb886bbd4e40c43b9bbce3ca3';
	const REDIRECT_URI = 'http://localhost:3001/redirect';
	return (
		<div className="headerWrapper">
			<Logo size={`mid`} />
			<Button className="hamburgerBtn" type="button">
				<Hamburger />
			</Button>
			<a
				href={`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`}
			>
				로그인
			</a>
		</div>
	);
}

export default Header;
