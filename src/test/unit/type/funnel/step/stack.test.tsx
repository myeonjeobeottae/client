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

jest.mock('next/router', () => require('next-router-mock'));
const setStep = jest.fn();
const setStepState = jest.fn();

beforeEach(() => {
	renderWithQueryClient(
		<StackTemp next={() => setStep('time')} setStepState={setStepState} />,
	);
});

describe('StackTemp컴포넌트가 렌더링 된다.', () => {
	it('"세부 기술을 선택해 주세요."가 렌더된다.', async () => {
		mockRouter.setCurrentUrl(`?funnel-step=stack`);

		expect(mockRouter.query['funnel-step']).toBe('stack');
		expect(
			await screen.findByText('세부 기술을 선택해 주세요.'),
		).toBeInTheDocument();
	});
	it('selectedStacks가 렌더된다.', async () => {
		const selectedStacks = screen.getByTestId('selectedStacks');
		expect(selectedStacks).toBeInTheDocument();
	});
});
