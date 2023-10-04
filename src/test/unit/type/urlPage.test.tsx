import { wantedUrl } from '@utils/variables';
import { render, screen } from '@testing-library/react';
import UrlPage from '@pages/[type]/url';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

beforeEach(() => {
	render(<UrlPage />);
});

describe(`input창에 url을 입력하고 확인 버튼을 클릭하면 로딩 컴포넌트가 렌더된다.`, () => {
	// 로딩컴포넌트 만들어야함
	// https://www.wanted.co.kr/wd/
	it(`input에 원티드 공고 형식${wantedUrl}이 포함되면, 확인 버튼이 활성화된다.`, () => {
		const urlInput = screen.getByRole('textbox');
		const button = screen.getByRole('button', { name: '확인' });
		userEvent.type(urlInput, wantedUrl);

		expect(button).toBeEnabled();
	});
	it('input에 원티드 공고 형식(https://www.wanted.co.kr/wd/)이 포함되지 않는다면, 확인 버튼이 비활성화된다.', () => {});
	it(`<UrlPage>가 렌더링 됐을 때, 뒤로가기 버튼이 있다`, () => {
		const backButton = screen.getByRole('button', { name: '뒤로가기' });
		expect(backButton).toBeInTheDocument();
	});
});
