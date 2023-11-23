import { LinkButton } from '@atoms/button/LinkButton';

export default function ChatPage() {
	return (
		<main className="chatPageWrapper">
			<h1 className="title">질문 방식을 선택해 주세요.</h1>
			<section className="selectBtns">
				<LinkButton className="url" href="/chat/url">
					URL
				</LinkButton>
				<LinkButton className="custom" href="/chat/custom">
					직접 선택
				</LinkButton>
			</section>
			<ul className="tips">
				<li className="tip">
					원티드에서 희망하는 채용 공고 url을 분석해서 질문을 생성해요.
				</li>
				<li className="tip">
					내가 직접 질문 환경(직무, 세부 기술 등)을 설정해요.
				</li>
			</ul>
		</main>
	);
}
