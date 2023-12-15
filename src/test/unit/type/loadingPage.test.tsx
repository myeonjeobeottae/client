import { screen } from '@testing-library/dom';
import { renderWithQueryClient, queryKey } from '@test/test-utils';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { act } from 'react-dom/test-utils';

describe('LoadingPage', () => {
	it('useQuery의 리턴값으로 올바른 status가 담긴다', async () => {
		const key = queryKey();
		const states: UseQueryResult<string>[] = [];

		function TestComponent() {
			const state = useQuery({
				queryKey: key,
				queryFn: () => 'test',
			});
			states.push(state);

			return (
				<div>
					<h1>Status: {state.status}</h1>
				</div>
			);
		}
		renderWithQueryClient(<TestComponent />);
		expect(await screen.findByText('Status: success'));

		/**
		 * await waitForElementToBeRemoved()는 비동기 작업 후 사라질 요소 체크
		 * expect.objectContaining은 하위 객체의 모든 요소가 포함되어야 pass
		 * toMatchObject는 하위 객체의 일부 요소만 포함되어도 pass
		 * expect.arrayContaining는 배열의 일부 요소를 포함하는지 검사
		 * */
		expect(states[0]).toMatchObject({
			data: undefined,
			isLoading: true,
			isSuccess: false,
			status: 'pending',
		});

		expect(states[1]).toMatchObject({
			data: 'test',
			isFetched: true,
			isFetchedAfterMount: true,
			isLoading: false,
			isStale: true,
			isSuccess: true,
			status: 'success',
		});
	});

	it('로딩중일 때, "Loading"이 렌더된다', async () => {
		const key = queryKey();
		const states: UseQueryResult<any>[] = [];

		function TestComponent() {
			const state = useQuery({
				queryKey: key,
				queryFn: () => setTimeout(() => 'test', 500),
			});
			states.push(state);

			return (
				<div>
					{state.isLoading && <div>Loading</div>}
					{!state.isLoading && <div>Success</div>}
					<h1>Status: {state.status}</h1>
				</div>
			);
		}
		renderWithQueryClient(<TestComponent />);

		await act(
			async () =>
				new Promise((resolve) => {
					setTimeout(() => {
						expect(screen.getByText('Loading')).toBeInTheDocument();
						resolve();
					}, 1000);
				}),
		);
	});
});
