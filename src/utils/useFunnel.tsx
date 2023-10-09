import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

interface StepProps {
	children: React.ReactElement;
}

interface FunnelProps {
	children: React.ReactElement[];
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
	console.log('🚀 ~ file: useFunnel.tsx:35 ~ selected:', selected);

	useEffect(() => {
		setState(router.query[`funnel-step`] as stateType);
	}, [router.query[`funnel-step`]]);

	const setStep = (
		step: stateType,
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
	) => {
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

	const Funnel = ({ children }: FunnelProps) => {
		const targetStep = children.find(
			(childStep) => childStep.props.name === state,
		);
		return targetStep;
	};
	Funnel.Step = Step;

	return [Funnel, setStep];
}
