import { LinkButton } from '@atoms/button/LinkButton';
import Image from 'next/image';
import Chat from '@images/landingPage/chat.png';
import Voice from '@images/landingPage/voice.png';

export default function LandingPage() {
	return (
		<main className="landingPageWrapper">
			<h1 className="title">면접 방식을 선택하세요</h1>
			<section className="selectBtns">
				<LinkButton href="/chat">
					<Image src={Chat} alt="chat" priority />
				</LinkButton>
				<LinkButton href="/voice">
					<Image src={Voice} alt="voice" priority />
				</LinkButton>
			</section>
		</main>
	);
}
