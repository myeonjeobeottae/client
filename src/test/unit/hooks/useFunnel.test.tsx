import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { useFunnel } from '@utils/useFunnel';
import { renderWithQueryClient } from '@test/test-utils';
import CustomPage from '@pages/[type]/custom';
import StackTemp from '@templates/stackTemp';

jest.mock('next/router', () => require('next-router-mock'));

describe('useFunnel이 정상적으로 동작하는지 테스트', () => {
	it('Query Param의 funnel-step이 position 때, position 스텝이 렌더된다.', async () => {
		mockRouter.setCurrentUrl(`?funnel-step=position`);
		renderWithQueryClient(<CustomPage />);

		expect(mockRouter.query['funnel-step']).toBe('position');
		expect(
			await screen.findByText('직무를 선택해 주세요.'),
		).toBeInTheDocument();
	});

	it('select1에서 setStep을 클릭하여 select2 스텝으로 넘어간다.', async () => {
		mockRouter.setCurrentUrl(`?funnel-step=position`);
		renderWithQueryClient(<CustomPage />);

		const button = await screen.findByRole('button', { name: '프론트엔드' });
		await userEvent.click(button);

		expect(mockRouter.query['funnel-step']).toBe('stack');
		expect(
			await screen.findByText('세부 기술을 선택해 주세요.'),
		).toBeInTheDocument();
	});

	it('funnel-step 쿼리 파라미터가 없고 initialStep이 있고, initialStep에 해당하는 스텝이 렌더된다.', async () => {
		function TestComponent() {
			const [테스트퍼널, _] = useFunnel({
				initialStep: 'time',
			});

			return (
				<테스트퍼널>
					<테스트퍼널.Step name="time">
						<h1>aaaa</h1>
					</테스트퍼널.Step>
				</테스트퍼널>
			);
		}

		renderWithQueryClient(<TestComponent />);

		expect(await screen.findByText('aaaa')).toBeInTheDocument();
	});

	// 	it('MenuItem을 누르면 상태가 변경된다.', async () => {
	// 		function TestComponent() {
	// 			const [테스트퍼널, setStep, setStepState] = useFunnel({
	// 				initialStep: 'time',
	// 			});

	// 			return (
	// 				<테스트퍼널>
	// 					<테스트퍼널.Step name="time">
	// 						<StackTemp next={() => setStep('time')} setState={setStepState} />,
	// 					</테스트퍼널.Step>
	// 				</테스트퍼널>
	// 			);
	// 		}

	// 		renderWithQueryClient(<TestComponent />);

	// 		const button = screen.getByTestId('skillMenuItem');

	// 		expect(button).toBeInTheDocument();

	// 		await userEvent.click(button);
	// 	});
});
