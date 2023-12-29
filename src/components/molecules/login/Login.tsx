import { IconProfile } from '@svgs/index';
import { KAKAO_LOGIN_URI } from '@utils/variables';
import { AuthContext } from 'context/Auth';
import { useContext } from 'react';

function Login() {
	const authService = useContext(AuthContext);

	const user = authService?.getCurrentUser();
	console.log('user', user);

	return (
		<a className="loginBtn" href={KAKAO_LOGIN_URI}>
			<IconProfile />
			<span>로그인</span>
		</a>
	);
}

export default Login;
