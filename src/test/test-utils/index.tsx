/* eslint-disable no-console */

import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, ReactNode } from 'react';
import { RenderResult } from '@testing-library/react';

const generateTestQueryClient = () => {
	const client = new QueryClient();
	const options = client.getDefaultOptions();
	options.queries = { ...options.queries, retry: false };
	return client;
};
export const renderWithQueryClient = (ui: ReactNode) => {
	const queryClient = new QueryClient();
	return render(
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={null}>{ui}</Suspense>
		</QueryClientProvider>,
	);
};

let queryKeyCount = 0;
export const queryKey = (): Array<string> => {
	queryKeyCount++;
	return [`query_${queryKeyCount}`];
};
