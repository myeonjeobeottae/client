import type { AppProps } from 'next/app';
// import '@styles/style.css'
// import '@styles/style.css';
import '../styles/scss/style.scss';

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
