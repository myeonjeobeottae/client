import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

interface StepProps {
	children: React.ReactElement;
}

interface FunnelProps {
	children: React.ReactElement[] | React.ReactElement;
}

interface returnType {
	Funnel: any;
	setStep: any;
}

interface selectedStateType {
	position: string;
	stack: string[];
	time: number;
}

type stateType = keyof selectedStateType;

export function useFunnel(options: {
	initialStep: stateType;
}): [returnType['Funnel'], returnType['setStep']] {
	const router = useRouter();
	const type = router.query && router.query.type;
	const [state, setState] = useState(options.initialStep);
	const [selected, setSelected] = useState<selectedStateType>({
		position: '',
		stack: [],
		time: 0,
	});
	console.log('🚀 ~ file: useFunnel.tsx:30 ~ state:', state);
	// console.log('🚀 ~ file: useFunnel.tsx:35 ~ selected:', selected);
	// const prevCountRef = useRef<string>(router.query[`funnel-step`]);
	// useEffect(() => {
	// 	prevCountRef.current = router.query[`funnel-step`]t;
	// }, [router.query[`funnel-step`]]);

	useEffect(() => {
		// debugger;
		if (!router.query[`funnel-step`]) {
			// debugger;
			router.replace(`/${type}/custom?funnel-step=${options.initialStep}`);
		} else {
			setState(router.query[`funnel-step`] as stateType);
		}
	}, [router.query[`funnel-step`]]);

	const setStep = (step: stateType, e: MouseEvent<HTMLButtonElement>) => {
		if (!e.currentTarget.dataset.name) {
			return;
		}
		const name = e.currentTarget.dataset.name;

		setSelected((prev) => {
			return { ...prev, [state]: name };
		});
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
		let targetStep;
		if (!Array.isArray(children)) {
			// targetStep = children;
			// if (children.props.name == state) {
			// );
			targetStep = children;
			// }

			// targetStep = children;
		} else {
			// if (Array.isArray(children))
			targetStep = children.find((childStep) => childStep.props.name === state);
		}

		return targetStep;
	};
	Funnel.Step = Step;

	return [Funnel, setStep];
}
