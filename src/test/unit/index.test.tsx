import LandingPage from '@pages/index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe(`<LandingPage />`, () => {
	it('랜딩페이지 링크 버튼을 누르면 해당 페이지로 이동한다.', () => {
		render(<LandingPage />);
		const chatButton = screen.getByRole('link', { name: 'chat' });
		userEvent.click(chatButton);

		expect(chatButton).toHaveAttribute('href', '/chat');

		const voiceButton = screen.getByRole('link', { name: 'voice' });
		userEvent.click(chatButton);

		expect(voiceButton).toHaveAttribute('href', '/voice');
	});
});
