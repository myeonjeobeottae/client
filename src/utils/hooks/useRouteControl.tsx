import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

function useRouteControl(blockingCallback: () => void) {
	const [nextUrl, setNextUrl] = useState<string>('');
	const router = useRouter();

	const isSamePath = useCallback(
		(nextUrl: string) => router.asPath.split('?')[0] === nextUrl.split('?')[0],
		[router.asPath],
	);
	//route blocking
	const handleRouteChange = useCallback(
		(nextUrl: string) => {
			if (isSamePath(nextUrl)) return;
			setNextUrl(nextUrl);
			blockingCallback();
			// router.events.emit('routeChangeError');
			throw 'Next Route is Blocking';
		},
		[router.events, isSamePath, blockingCallback],
	);

	//route unBlocking
	const unBlockingWithCallback = useCallback(
		(callback?: () => void) => {
			router.events.off('routeChangeStart', handleRouteChange);
			router.replace(nextUrl);
			callback?.();
		},
		[router.events, handleRouteChange],
	);

	//router events 등록
	useEffect(() => {
		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [router.events, handleRouteChange]);

	return { unBlockingWithCallback };
}

export default useRouteControl;
