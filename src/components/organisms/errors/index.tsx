import { IconWaring } from '@svgs/index';
import { BackButton } from '@atoms/button/BackButton';
import Button from '@atoms/button';

export function AuthError() {
	return <div>AuthError</div>;
}

export function OtherError() {
	console.log('otherError');
	return (
		<main
			style={{
				color: 'limegreen',
				position: 'absolute',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100vw',
				height: '100vh',
			}}
		>
			<section
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					whiteSpace: 'pre-wrap',
					textAlign: 'center',
				}}
			>
				<IconWaring style={{ width: '250px', height: '250px' }} />
				<h1>서비스 에러가 발생 하였습니다.</h1>
				<p>{`죄송합니다.\n기술적인 문제로인해\n일시적으로 서비스를 사용할 수 없습니다\n관리자에게 요청하여 빠른 시간 안에 해결 하겠습니다.`}</p>
				<div style={{ display: 'flex', color: 'white' }}>
					<BackButton style={{ color: 'inherit' }}>뒤로가기</BackButton>
					<Button
						style={{ color: 'inherit' }}
						onClick={() => (window.location.href = '/')}
					>
						메인으로 가기
					</Button>
				</div>
			</section>
		</main>
	);
}
