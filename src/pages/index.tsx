import Button from '@atoms/button';
import { LinkButton } from '@atoms/button/LinkButton';
import Image from 'next/image';
import Background from '@images/landingPage/bg.png';
import Chat from '@images/landingPage/chat.png';
import Voice from '@images/landingPage/voice.png';
// import Button from '@atoms/button/Button'

export default function LandingPage() {
	const handleClick = () => {};
	// teest

	return (
		<main className="landing-page-wrapper">
			<Image
				className="bg"
				src={Background}
				alt="LandingPage Background Image"
			/>
			<h1 className="title">면접 방식을 선택하세요</h1>
			<section className="btn-box">
				<LinkButton href="/chat">
					<Image src={Chat} alt="chat" />
				</LinkButton>
				<LinkButton href="/voice">
					<Image src={Voice} alt="voice" />
				</LinkButton>
			</section>
		</main>
	);
}
