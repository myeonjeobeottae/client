import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
export function useFunnel(options?: {
	initialStep: string;
}): [returnType['Funnel'], returnType['setStep']] {
	const router = useRouter();
	const type = router.query && router.query.type;
	const [state, setState] = useState(options?.initialStep);

	useEffect(() => {
		setState(router.query[`funnel-step`] as string);
	}, [router.query[`funnel-step`]]);

	const setStep = (step: string) => {
		setState(step);
		router.push(`/${type}/custom?funnel-step=${step}`);
	};

	const Step = (props: StepProps) => {
		console.log(`step`, state);
		// debugger;
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
