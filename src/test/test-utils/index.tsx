/* eslint-disable no-console */

import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { RenderResult } from '@testing-library/react'

const generateTestQueryClient = () => {
	const client = new QueryClient()
	const options = client.getDefaultOptions()
	options.queries = { ...options.queries, retry: false }
	return client
}

export const renderWithQueryClient = (
	ui: ReactElement,
	client?: QueryClient,
): RenderResult => {
	const queryClient = client ?? generateTestQueryClient()
	return render(
		<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
	)
}
