import Layout from '@templates/layout';
import Loading from '@atoms/loading/Loading';
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/scss/style.scss';

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 0,
						refetchOnWindowFocus: false,
					},
				},
			}),
	);
	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={pageProps.dehydratedState}>
				<Layout>
					<Suspense fallback={<Loading />}>
						<Component {...pageProps} />
						<ReactQueryDevtools
							initialIsOpen={false}
							buttonPosition="bottom-right"
						/>
					</Suspense>
				</Layout>
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
