import Layout from '@templates/layout';
import Loading from '@molecules/loading';
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useState } from 'react';
import {
	ApiErrorBoundary,
	GlobalErrorBoundary,
} from '@templates/errorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import '../styles/scss/style.scss';
import { AuthProvider } from 'context/Auth';

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
				<GlobalErrorBoundary>
					<ApiErrorBoundary>
						<AuthProvider>
							<Suspense fallback={<Loading />}>
								<Layout>
									<Component {...pageProps} />
									<ReactQueryDevtools
										initialIsOpen={false}
										buttonPosition="bottom-right"
									/>
								</Layout>
								<ToastContainer autoClose={2000} pauseOnHover />
							</Suspense>
						</AuthProvider>
					</ApiErrorBoundary>
				</GlobalErrorBoundary>
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
