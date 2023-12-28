import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { normalizeOptions } from '@utils/normalizeOptions';

type ControlOptions = {
	/**
	 * 새로고침 방지 유무
	 *
	 * @defaultValue `true`
	 */
	reload?: boolean | undefined;
	/**
	 * 커스텀 RouteBlocking 조건
	 *
	 * @defaultValue `true`
	 */
	condition?: boolean | undefined;
};

const defaultControlOptions: ControlOptions = { reload: true, condition: true };

/**
 * @param {Function} blockingCallback Routing을 막는 Callback함수
 * @returns {Function} unBlockingWithCallback(Callback:optional)
 */
function useRouteControl(
	blockingCallback: () => void,
	options: ControlOptions = defaultControlOptions,
) {
	const [nextUrl, setNextUrl] = useState<string>('');
	const router = useRouter();

	//optional undefined 방지
	normalizeOptions(options, defaultControlOptions);

	//reload 감지
	useEffect(() => {
		const preventReload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
		};
		if (options.reload && options.condition) {
			window.addEventListener('beforeunload', preventReload);
		}
		return () => {
			window.removeEventListener('beforeunload', preventReload);
		};
	}, [options.reload, options.condition]);

	//같은 페이지 유무
	const isSamePath = useCallback(
		(nextUrl: string) => router.asPath.split('?')[0] === nextUrl.split('?')[0],
		[router.asPath],
	);

	const syncUrlWithRouter = useCallback(() => {
		// if the user clicked on the browser back button then the url displayed in the browser gets incorrectly updated
		console.log(router.asPath, window.location.pathname);
		if (router.asPath !== window.location.pathname) {
			window.history.pushState(null, '', router.asPath);
		}
	}, [router.asPath]);

	console.log(router);
	//route blocking
	const handleRouteChange = useCallback(
		(nextUrl: string) => {
			console.log(
				isSamePath(nextUrl),
				router.asPath.split('?')[0],
				nextUrl.split('?')[0],
			);
			if (isSamePath(nextUrl)) return;
			syncUrlWithRouter();
			setNextUrl(nextUrl);
			blockingCallback();
			// router.events.emit('routeChangeError');
			throw 'Next Route is Blocking';
		},
		[router.events, isSamePath, syncUrlWithRouter, blockingCallback],
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
		if (options.condition) {
			router.events.on('routeChangeStart', handleRouteChange);
		}
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [router.events, handleRouteChange, options.condition]);

	return { unBlockingWithCallback };
}

export default useRouteControl;
