import { IconProfile } from '@svgs/index';
import { KAKAO_LOGIN_URI } from '@utils/variables';

function Login() {
	return (
		<a className="loginBtn" href={KAKAO_LOGIN_URI}>
			<IconProfile />
			<span>로그인</span>
		</a>
	);
}

export default Login;
