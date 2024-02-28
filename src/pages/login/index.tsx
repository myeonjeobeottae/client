import Button from '@atoms/button';
import Login from '@molecules/login';
import { KAKAO_LOGIN_URI } from '@utils/variables';

function index() {
	return (
		<main className="loginPageWrapper">
			{/* <Button className="loginButton">로그인버튼</Button> */}
			<div className="loginButtonWrapper">
				<Login />
			</div>

			{/* <a className="loginButton" href={KAKAO_LOGIN_URI}></a> */}
		</main>
	);
}

export default index;
