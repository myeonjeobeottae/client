import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

type ControlOptions = {
	/**
	 * 새로고침 방지 유무
	 *
	 * reload : true(default);
	 */
	reload?: boolean | undefined;
	/**
	 * 커스텀 RouteBlocking 조건
	 *
	 * condition : true(default);
	 */
	condition?: boolean | undefined;
};

const DefaultControlOptions: ControlOptions = { reload: true, condition: true };

/**
 * @param {Function} blockingCallback Routing을 막는 Callback함수
 * @returns {Function} unBlockingWithCallback(Callback:optional)
 */
function useRouteControl(
	blockingCallback: () => void,
	options: ControlOptions = DefaultControlOptions,
) {
	const [nextUrl, setNextUrl] = useState<string>('');
	const router = useRouter();

	//optional undefined 방지
	useEffect(() => {
		options.reload = options.reload === undefined ? true : options.reload;
		options.condition =
			options.condition === undefined ? true : options.condition;
	}, [options.reload, options.condition]);

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
		console.log(options.reload, options.condition);
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
