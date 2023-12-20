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
import StackTemp from '@templates/stackTemp';
import ResultTemp from '@templates/resultTemp';

describe('ResultTemp가 정상적으로 동작하는지 테스트', () => {
	it('각 Step에서 funnel을 통해 가져온 state들이 랜더된다.', async () => {
		const user = userEvent.setup();

		function TestComponent() {
			const [테스트퍼널, _, setStep] = useFunnel({ initialStep: 'position' });

			return (
				<테스트퍼널>
					<테스트퍼널.Step name="test1">
						<h1>Test1</h1>
						<button onClick={() => setStep('test2')}>next</button>
					</테스트퍼널.Step>
					<테스트퍼널.Step name="test2">
						<h1>Test2</h1>
					</테스트퍼널.Step>
				</테스트퍼널>
			);
		}
	});
	it('funnel의 Step이 추가되어도 정상적으로 랜더된다.', async () => {
		// FIXME:  funnel 로직 변경해야 가능함
	});
});
