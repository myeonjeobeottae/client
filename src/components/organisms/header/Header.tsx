import Logo from '@atoms/logo/Logo';
import { IconProfile } from '@svgs/index';
import { KAKAO_LOGIN_URI } from '@utils/variables';

function Header() {
	return (
		<div className="headerWrapper">
			<Logo size={`mid`} />
			<a className="loginBtn" href={KAKAO_LOGIN_URI}>
				<IconProfile />
				<span>로그인</span>
			</a>
		</div>
	);
}

export default Header;
