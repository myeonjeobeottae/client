import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@test/test-utils';
import mockRouter from 'next-router-mock';
import TimeTemp from '@templates/timeTemp/TimeTemp';

jest.mock('next/router', () => require('next-router-mock'));
const next = jest.fn();
const setStepState = jest.fn();
const selected: any = jest.fn(() => 3);

beforeEach(() => {
	renderWithQueryClient(
		<TimeTemp selected={selected} next={next} setStepState={setStepState} />,
	);
});

const makeOptions = (level: number, name: string) => {
	return { level, name };
};

describe('time컴포넌트가 렌더된다', () => {
	it('"문제당 제한시간을 선택해 주세요"가 렌더된다', async () => {
		mockRouter.setCurrentUrl(`?funnel-step=time`);

		expect(mockRouter.query['funnel-step']).toBe('time');

		const title = await screen.findByRole(
			'heading',
			makeOptions(1, '문제당 제한시간을 선택해 주세요.'),
		);
		expect(title).toBeInTheDocument();
	});

	it('기본 제한시간이 3분으로 선택된 채 렌더된다.', async () => {
		const button = await screen.findByRole('button', { name: '3분' });
		expect(button).toHaveClass('selected');
	});

	it('다른 제한시간버튼을 클릭하면 해당버튼에 "selected" 클래스가 추가된다', async () => {
		const limit3Button = await screen.findByRole('button', { name: '3분' });
		await userEvent.click(limit3Button);
		expect(limit3Button).toHaveClass('selected');

		const limit5Button = await screen.findByRole('button', { name: '5분' });
		await userEvent.click(limit5Button);
		expect(limit5Button).toHaveClass('selected');
	});
});
