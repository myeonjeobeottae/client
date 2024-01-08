import { IconProfile } from '@svgs/index';

function Login() {
	return (
		<a className="loginBtn" href={`${process.env.NEXT_PUBLIC_KAKAO_LOGIN_URI}`}>
			<IconProfile />
			<span>로그인</span>
		</a>
	);
}

export default Login;
