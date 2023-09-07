import Button from '@atoms/button';
import LinkButton from '@atoms/linkButton/LinkButton';
import Image from 'next/image';
import Background from '@public/landingPage/bg.png';
import Chat from '@public/landingPage/chat.png';
import Voice from '@public/landingPage/voice.png';
// import Button from '@atoms/button/Button'

export default function LandingPage() {
	const handleClick = () => {};
	// teest

	return (
		<div className="landing-page-wrapper">
			<Image
				className="bg"
				src={Background}
				objectFit="contain"
				objectPosition="center"
				alt="LandingPage Background Image"
			/>
			<div className="title">면접 방식을 선택하세요</div>
			<div className="btn-box">
				<LinkButton href="/chat">
					<Image src={Chat} alt="LandingPage Chat button Image" />
				</LinkButton>
				<LinkButton href="/voice">
					<Image src={Voice} alt="LandingPage Voice button Image" />
				</LinkButton>
			</div>
		</div>
	);
}
