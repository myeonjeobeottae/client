import { useState, JSXElementConstructor, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

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
function useFunnel(options?: {
	initialStep: string;
}): [returnType['Funnel'], returnType['setStep']] {
	const router = useRouter();
	const type = router.query && router.query.type;
	const [state, setState] = useState(options?.initialStep);
	const [onEnter, setOnEnter] = useState(false);

	const setStep = (step: string) => {
		setState(step);
		router.push(`${type}/${step}`);
	};

	const Step = (props: StepProps) => {
		useEffect(() => {
			props.children.type ? setOnEnter(true) : setOnEnter(false);
		}, [onEnter]);

		console.log(`children`, props.children);
		return onEnter && <>{props.children}</>;
	};

	const Funnel = ({ children }: FunnelProps) => {
		const targetStep = children.find(
			(childStep) => childStep.props.name === state,
		);
		console.log(`target`, targetStep, children, `step`, Step);
		return Object.assign();
	};

	return [Funnel, setStep];
}

export default useFunnel;
