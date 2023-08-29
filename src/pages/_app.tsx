import type { AppProps } from 'next/app'
// import '@styles/style.css'
import '@/styles/css/style.css'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
