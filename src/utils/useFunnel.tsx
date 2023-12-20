import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

interface StepProps {
	children: React.ReactElement;
}

interface FunnelProps {
	children: React.ReactElement[] | React.ReactElement;
}

export interface selectedStateType {
	position: string;
	stack: any[];
	time: string | number;
}

type returnType = [
	Funnel: any,
	selected: selectedStateType,
	setStep: any,
	setStepState: any,
];

type stateType = keyof selectedStateType;

export function useFunnel(options: { initialStep: stateType }): returnType {
	const router = useRouter();
	const type = router.query && router.query.type;
	const [state, setState] = useState(options.initialStep);
	const [selected, setSelected] = useState<selectedStateType>({
		position: '',
		stack: [],
		time: 3,
	});

	console.log(selected);

	useEffect(() => {
		if (!router.query[`funnel-step`]) {
			router.replace(`/${type}/custom?funnel-step=${options.initialStep}`);
		} else {
			setState(router.query[`funnel-step`] as stateType);
		}
	}, [router.query[`funnel-step`]]);

	const setStepState = (
		e: MouseEvent<HTMLButtonElement>,
		tabData?: selectedStateType['stack'],
		timeData?: selectedStateType['time'],
	) => {
		switch (state) {
			case 'position':
				if (!e.currentTarget.dataset.name) {
					return;
				}
				const name = e.currentTarget.dataset.name;

				setSelected((prev) => {
					return { ...prev, position: name };
				});
				break;
			case 'stack':
				if (tabData) {
					setSelected((prev) => {
						return {
							...prev,
							stack: [...tabData],
						};
					});
				}
				break;
			case 'time':
				console.log('timeitme', timeData);
				if (timeData) {
					console.log('success');
					setSelected((prev) => {
						return {
							...prev,
							time: timeData,
						};
					});
				}
				break;
			default:
		}
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

	return [Funnel, selected, setStep, setStepState];
}
