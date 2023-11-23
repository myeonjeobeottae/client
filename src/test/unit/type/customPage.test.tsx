import { screen } from '@testing-library/dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { Suspense, ReactNode, ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useFunnel } from '@utils/useFunnel';
import { renderWithQueryClient } from '@test/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PositionTemp from '@templates/positionTemp';
import CustomPage from '@pages/[type]/custom';
import ChatPage from '@pages/[type]';

jest.mock('next/router', () => require('next-router-mock'));

// const queryClient = new QueryClient();

// function renderWithTestAppContext(node: ReactElement) {
// 	return render(
// 		<QueryClientProvider client={queryClient}>
// 			<Suspense fallback={null}>{node}</Suspense>
// 		</QueryClientProvider>,
// 	);
// }

const TestTemp = () => {
	return <h1>Test1</h1>; //page
};

describe('useFunnel이 정상적으로 동작하는 테스트', () => {
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
			const [테스트퍼널, setStep] = useFunnel({
				initialStep: 'time',
			});
			console.log(
				'🚀 ~ file: customPage.test.tsx:59 ~ TestComponent ~ 테스트퍼널:',
				테스트퍼널,
			);

			return (
				<테스트퍼널>
					<테스트퍼널.Step name="time">
						<h1>time2</h1>
					</테스트퍼널.Step>
				</테스트퍼널>
			);
		}

		renderWithQueryClient(<TestComponent />);

		// expect(
		// 	await screen.findByText('세부 기술을 선택해 주세요.'),
		// ).toBeInTheDocument();

		expect(await screen.findByText('time2')).toBeInTheDocument();
		// expect(await screen.findAllByText(/time2/)).toBeInTheDocument();
		// expect(
		// 	screen.getByText((_, element) => element?.textContent === 'time2'),
		// ).toBeInTheDocument();

		// SSR에서 에러가 생기는지 여부 확인
		// expect(() =>
		// 	ReactDOMServer.renderToString(
		// 		<QueryClientProvider client={queryClient}>
		// 			<Suspense fallback={null}>
		// 				<TestComponent />
		// 			</Suspense>
		// 		</QueryClientProvider>,
		// 	),
		// ).not.toThrow();
	});

	// 	it('options에 stepQueryKey가 kkk이면, 현재 스텝을 나타내는 query key는 kkk이고 setStep 시 kkk가 변경된다.', async () => {
	// 		const CUSTOM_QUERY_KEY = 'kkk';
	// 		function TestComponent() {
	// 			const [테스트퍼널, setStep] = useFunnel(퍼널스텝리스트, {
	// 				initialStep: 'test1',
	// 				stepQueryKey: CUSTOM_QUERY_KEY,
	// 			});

	// 			return (
	// 				<테스트퍼널>
	// 					<테스트퍼널.Step name="test1">
	// 						<h1>Test1</h1>
	// 						<button onClick={() => setStep('test2')}>next</button>
	// 					</테스트퍼널.Step>
	// 					<테스트퍼널.Step name="test2">
	// 						<h1>Test2</h1>
	// 					</테스트퍼널.Step>
	// 				</테스트퍼널>
	// 			);
	// 		}

	// 		mockRouter.setCurrentUrl(`?${CUSTOM_QUERY_KEY}=test1`);
	// 		renderWithTestAppContext(<TestComponent />);

	// 		const button = await screen.findByRole('button', { name: 'next' });
	// 		await userEvent.click(button);

	// 		expect(mockRouter.query[CUSTOM_QUERY_KEY]).toBe('test2');
	// 	});
	// });

	// describe('useFunnel.withState', () => {
	// 	it('퍼널 스텝과 퍼널 상태를 동시에 갱신할 수 있다: 퍼널 스텝을 변경할 때 퍼널 상태 갱신이 완료될 때까지 지연할 수 있다', async () => {
	// 		mockRouter.setCurrentUrl(`?funnel-step=시작`);

	// 		function FunnelPage() {
	// 			const [Funnel, state, setState] = useFunnel([
	// 				'시작',
	// 				'다음',
	// 			] as const).withState<{ count?: number }>({});

	// 			return (
	// 				<Funnel>
	// 					<Funnel.Step name="시작">
	// 						<시작 on확인={() => setState({ step: '다음', count: 1 })} />
	// 					</Funnel.Step>
	// 					<Funnel.Step name="다음">
	// 						<다음 requiredProp={state.count!} />
	// 					</Funnel.Step>
	// 				</Funnel>
	// 			);
	// 		}
	// 		function 시작({ on확인 }: { on확인: () => void }) {
	// 			return (
	// 				<div>
	// 					시작
	// 					<button onClick={on확인}>확인</button>
	// 				</div>
	// 			);
	// 		}
	// 		function 다음({ requiredProp }: { requiredProp: number }) {
	// 			return (
	// 				<div>
	// 					끝<span>{requiredProp}</span>
	// 				</div>
	// 			);
	// 		}

	// 		renderWithTestAppContext(<FunnelPage />);

	// 		await userEvent.click(await screen.findByRole('button', { name: '확인' }));

	// 		expect(await screen.findByText('1')).toBeInTheDocument();
	// 	});
});
