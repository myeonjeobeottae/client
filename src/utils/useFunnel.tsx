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

	/**
	 * ChatPage => Funnel
	 * replace 로 주는 주소는 history에 쌓이지 않기 떄문에, custom이 마지막 history 기록이기 때문에 뒤로가기 동작함
	 *
	 * position이 asPath에 할당 된 이유
	 * replae 후 useeffect의 else 로직이 돌아 리랜더링되면 asPathdp postion이 할당됨
	 * 이유: 브라우저가 표시되는 경로
	 */
	useEffect(() => {
		// debugger;
		if (!router.query[`funnel-step`]) {
			// debugger;
			router.replace(`/${type}/custom?funnel-step=${options.initialStep}`);
			console.log('111', router);
		} else {
			console.log('111else', router);
			setState(router.query[`funnel-step`] as stateType);
		}
	}, [router.query[`funnel-step`]]);

	console.log('clean111', router);
	const setStep = (step: stateType, e: MouseEvent<HTMLButtonElement>) => {
		if (!e.currentTarget.dataset.name) {
			return;
		}
		// console.log(e, e.currentTarget, e.target);
		const name = e.currentTarget.dataset.name;

		setSelected((prev) => {
			// console.log(e, e.currentTarget, e.target);

			return { ...prev, [state]: name };
		});
		console.log('1112', router);
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
		// console.log('🚀 ~ file: useFunnel.tsx:70 ~ Funnel ~ children:', children, [
		// 	children,
		// 	typeof children,
		// ]);
		let targetStep;
		if (!Array.isArray(children)) {
			// console.log(
			// 	'🚀 ~ file: useFunnel.tsx:82 ~ Funnel ~ children:',
			// 	children.props.name,
			// );
			// targetStep = children;
			// if (children.props.name == state) {
			// console.log(
			// 	'🚀 ~ file: useFunnel.tsx:180 ~ Funnel ~ children.props.name:',
			// 	state,
			// 	children.props.name,
			// );
			targetStep = children;
			// }

			// targetStep = children;
		} else {
			// if (Array.isArray(children))
			// console.log('🚀 ~ file: useFunnel.tsx:98 ~ Funnel ~ children:', children);
			targetStep = children.find((childStep) => childStep.props.name === state);
		}

		return targetStep;
	};
	Funnel.Step = Step;

	return [Funnel, setStep];
}

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { MouseEvent } from 'react';

// interface StepProps {
// 	children: React.ReactElement;
// }

// interface FunnelProps {
// 	children: React.ReactElement[] | React.ReactElement;
// }

// interface returnType {
// 	Funnel: any;
// 	setStep: any;
// }

// interface selectedStateType {
// 	position: string;
// 	stack: string[];
// 	time: number;
// }

// type stateType = keyof selectedStateType;

// export function useFunnel(options: {
// 	initialStep: stateType;
// }): [returnType['Funnel'], returnType['setStep']] {
// 	const router = useRouter();
// 	const type = router.query && router.query.type;
// 	const [state, setState] = useState(options.initialStep);
// 	const [selected, setSelected] = useState<selectedStateType>({
// 		position: '',
// 		stack: [],
// 		time: 0,
// 	});
// 	console.log('🚀 ~ file: useFunnel.tsx:30 ~ state:', state);
// 	console.log('🚀 ~ file: useFunnel.tsx:35 ~ selected:', selected);

// 	useEffect(() => {
// 		if (!router.query[`funnel-step`]) {
// 			router.push(`/${type}/custom?funnel-step=${options.initialStep}`);
// 		} else {
// 			setState(router.query[`funnel-step`] as stateType);
// 		}
// 	}, [router.query[`funnel-step`]]);

// 	// useEffect(() => {}, []);

// 	const setStep = (step: stateType, e: MouseEvent<HTMLButtonElement>) => {
// 		if (!e.currentTarget.dataset.name) {
// 			return;
// 		}
// 		console.log(e, e.currentTarget, e.target);
// 		const name = e.currentTarget.dataset.name;

// 		setSelected((prev) => {
// 			console.log(e, e.currentTarget, e.target);

// 			return { ...prev, [state]: name };
// 		});
// 		router.push(`/${type}/custom?funnel-step=${step}`);
// 	};

// 	const Step = (props: StepProps) => {
// 		return <>{props.children}</>;
// 	};

// 	/**
// 	 * FIXME: children.find 가 언디파인드면 (즉, initialStep과 일치하는 name이 없으면) 처리하기
// 	 *
// 	 */
// 	const Funnel = ({ children }: FunnelProps) => {
// 		let targetStep;
// 		if (!Array.isArray(children)) {
// 			console.log(
// 				'🚀 ~ file: useFunnel.tsx:178 ~ Funnel ~ children:',
// 				children.props.name,
// 				state,
// 			);
// 			if (children.props.name === state) {
// 				console.log(
// 					'🚀 ~ file: useFunnel.tsx:180 ~ Funnel ~ children.props.name:',
// 					children.props.name,
// 				);
// 				targetStep = children;
// 			}
// 		} else {
// 			if (Array.isArray(children))
// 				targetStep = children.find(
// 					(childStep) => childStep.props.name === state,
// 				);
// 		}

// 		return targetStep;
// 	};
// 	Funnel.Step = Step;

// 	return [Funnel, setStep];
// }
