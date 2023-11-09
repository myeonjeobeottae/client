import Logo from '@atoms/logo/Logo';
import { IconProfile } from '@svgs/index';

function Header() {
	const REST_API_KEY = '8bf32c7eb886bbd4e40c43b9bbce3ca3';
	const REDIRECT_URI = 'http://localhost:3001/redirect';
	return (
		<div className="headerWrapper">
			<Logo size={`mid`} />
			<a
				className="loginBtn"
				href={`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`}
			>
				<IconProfile />
				<span>로그인</span>
			</a>
		</div>
	);
}

export default Header;
