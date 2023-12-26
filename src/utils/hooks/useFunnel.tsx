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

export interface selectedStateType {
	position: any;
	stack: any;
	time: any;
}

type returnType = [Funnel: any, selected: any, setStep: any, setStepState: any];

type stateType = keyof selectedStateType;

/**
 * - []  useFunnel 제네릭 타입으로 수정
 * - [x] setStepState 함수 수정
 */

export type SelectedTy<T extends string> = {
	[P in T]: string;
};

function useFunnel<T extends string>(options: { initialStep: T }): returnType {
	const router = useRouter();
	const type = router.query && router.query.type;

	const [state, setState] = useState<T>(options.initialStep);
	const [selected, setSelected] = useState<SelectedTy<T>>({
		[options.initialStep]: '',
	} as SelectedTy<T>);

	console.log(selected);

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

	const setStep = (step: stateType) => {
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
