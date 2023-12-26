import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { routerError } from '@utils/error';

interface StepProps {
	children: React.ReactElement;
}

interface FunnelProps {
	children: React.ReactElement[] | React.ReactElement;
}

type returnType<T extends string> = [
	Funnel: any,
	selected: SelectedType<T>,
	setStep: any,
	setStepState: any,
];

type stateType<T extends string> = {
	[P in T]: P;
};

type SelectedType<T extends string> = {
	[P in T]: string;
};

function useFunnel<T extends string>(options: {
	initialStep: T;
}): returnType<T> {
	const router = useRouter();
	const type = router.query && router.query.type;

	const [state, setState] = useState<T>(options.initialStep);
	const [selected, setSelected] = useState<SelectedType<T>>({
		[options.initialStep]: '',
	} as SelectedType<T>);

	console.log(selected);

	//TODO: router.events.on / off로 로직변경하기
	// useEffect(() => {
	// 	console.log(router.query['type']);
	// 	// toast.warn('페이지를 닫으시겠습니까?');
	// 	const preventClose = (e: BeforeUnloadEvent) => {
	// 		e.preventDefault();
	// 	};
	// 	// router.events.on , off ( routerChangeStart)
	// 	(() => {
	// 		window.addEventListener('beforeunload', preventClose);
	// 	})();
	// 	return () => {
	// 		window.removeEventListener('beforeunload', preventClose);
	// 	};
	// 	// }
	// }, []);

	useEffect(() => {
		console.log(router.query);
		if (!router.query[`funnel-step`] && type == 'chat') {
			router.replace(`/${type}/custom?funnel-step=${options.initialStep}`);
		} else {
			setState(router.query[`funnel-step`] as T);
		}
	}, [router.query[`funnel-step`]]);

	const setStepState = (stepData: string) => {
		console.log(
			'🚀 ~ file: useFunnel.tsx:83 ~ setStepState ~ stepData:',
			stepData,
			selected,
		);
		setSelected((prev) => {
			return { ...prev, [state as string]: stepData };
		});
	};

	const setStep = (step: stateType<T>) => {
		router.push(`/${type}/custom?funnel-step=${step}`);
	};

	const Step = (props: StepProps) => {
		return <>{props.children}</>;
	};

	/**
	 * FIXME: children.find 가 언디파인드면 (즉, initialStep과 일치하는 name이 없으면) 처리하기
	 *
	 */
	const Funnel = ({ children }: FunnelProps) => {
		if (router.query['type'] === undefined) {
			return routerError('잘못된 접근입니다.', 600);
		}
		let targetStep;

		if (!Array.isArray(children)) {
			targetStep = children;
		} else {
			targetStep = children.find((childStep) => childStep.props.name === state);
		}

		return targetStep;
	};
	Funnel.Step = Step;

	return [Funnel, selected, setStep, setStepState];
}

export default useFunnel;
