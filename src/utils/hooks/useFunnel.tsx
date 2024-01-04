import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { routerError } from '@utils/error';

interface StepProps {
	children: React.ReactElement;
	name: string;
}

interface FunnelProps {
	children: React.ReactElement[] | React.ReactElement;
}

type FunnelType = {
	({ children }: FunnelProps): React.ReactElement | undefined;
	Step: (props: StepProps) => React.JSX.Element;
};

type ReturnType<T extends string> = [
	Funnel: FunnelType,
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
}): ReturnType<T> {
	const router = useRouter();
	const type = router.query && router.query.type;

	const [state, setState] = useState<T>(options.initialStep);
	const [selected, setSelected] = useState<SelectedType<T>>({
		[options.initialStep]: '',
	} as SelectedType<T>);

	console.log(selected);

	useEffect(() => {
		console.log(router.query);
		if (!router.query[`funnel-step`]) {
			router.replace(`${router.asPath}?funnel-step=${options.initialStep}`);
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
	const Funnel = ({
		children,
	}: FunnelProps): React.ReactElement | undefined => {
		if (
			router.query['funnel-step'] !== options.initialStep &&
			router.query['funnel-step'] !== undefined &&
			selected[options.initialStep] === ''
		) {
			routerError('잘못된 접근입니다.', 600);
		}

		let targetStep;

		if (!Array.isArray(children)) {
			targetStep = children;
		} else {
			targetStep = children.find(
				(childStep) => childStep && childStep.props.name === state,
			);
		}

		return targetStep;
	};
	Funnel.Step = Step;

	return [Funnel, selected, setStep, setStepState];
}

export default useFunnel;
