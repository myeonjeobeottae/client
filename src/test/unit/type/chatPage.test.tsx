import ChatPage from '@pages/[type]';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@test/test-utils';

// jest.mock('next/router', () => ({
// 	useRouter: jest.fn().mockReturnValue({
// 		query: { type: 'chat' },
// 	}),
// }));

describe(`<ChatPage />`, () => {
	it('ChatPage에 타이틀이 렌더링 된다.', () => {
		render(<ChatPage />);
		const chatTitle = screen.getByText('질문 방식을 선택할 수 있어요');

		expect(chatTitle).toBeInTheDocument();
	});
	it('ChatPage에 각 링크버튼에 대한 설명글이 렌더링 된다.', () => {
		render(<ChatPage />);
		const chatExplainList = screen.getAllByRole('listitem');

		expect(chatExplainList).toHaveLength(2);
	});

	it('ChatPage에 링크 버튼을 누르면 해당 페이지로 이동한다.', async () => {
		mockRouter.setCurrentUrl(`/chat`);
		renderWithQueryClient(<ChatPage />);
		// const { type } = useRouter().query;
		// const router = useRouter();
		const urlButton = screen.getByRole('link', { name: 'URL' });
		// const customButton = screen.getByRole('link', { name: '직접 선택' });

		await userEvent.click(urlButton);

		expect(mockRouter.pathname).toBe('/[type]/url');

		// expect(customButton).toHaveAttribute('href', `/${type}/custom`);
		// expect(urlButton).toHaveAttribute('href', `/${type}/url`);
	});
});

// expect(mockRouter.query['funnel-step']).toBe('test2');
