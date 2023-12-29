import { LinkButton } from '@atoms/button/LinkButton';
import Image from 'next/image';
import Chat from '@images/landingPage/chat.png';
import Voice from '@images/landingPage/voice.png';
import { GetServerSideProps } from 'next';

export default function LandingPage() {
	return (
		<main className="landingPageWrapper">
			<h1 className="title">면접 방식을 선택하세요</h1>
			<section className="selectBtns">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		// console.log('context', context.req);
		// const cookie = req.headers;
		//FIXME: 서버 set headers 요청
		// console.log(
		// 	'🚀 ~ file: index.tsx:28 ~ constgetServerSideProps:GetServerSideProps= ~ cookie:',
		// 	cookie,
		// );
		console.log('bbbbb');
		return {
			props: {},
		};
	} catch (error) {
		console.log('에러 발생', error);
		return {
			props: {},
		};
	}
};
