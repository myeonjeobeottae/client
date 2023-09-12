import LinkButton from '@atoms/linkButton/LinkButton';
import React from 'react';

export default function ChatPage() {
	return (
		<main className="chat-page-wrapper">
			<h1>질문 방식을 선택할 수 있어요</h1>
			<section className="btn-box">
				<LinkButton href="/chat/url">URL</LinkButton>
				<LinkButton href="/chat/custom">직무 선택</LinkButton>
			</section>
			<ul>
				<li>
					💡 원티드에서 희망하는 채용 공고 url을 분석해서 질문을 생성해요.
				</li>
				<li>💡 내가 직접 질문 환경(직무, 세부 기술 등)을 설정해요.</li>
			</ul>
		</main>
	);
}
