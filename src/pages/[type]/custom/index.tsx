import PositionTemp from '@templates/positionTemp';
import StackTemp from '@templates/stackTemp';
import TimeTemp from '@templates/timeTemp';
import ResultTemp from '@templates/resultTemp';
import useFunnel from '@utils/hooks/useFunnel';
import { ApiErrorBoundary } from '@templates/errorBoundary';
import { useState } from 'react';
import useRouteControl from '@utils/hooks/useRouteControl';

export type useFunnelType = 'position' | 'stack' | 'time' | 'result';

function CustomPage() {
	const [Funnel, selected, setStep, setStepState] = useFunnel<useFunnelType>({
		initialStep: 'position',
	});
	//TODO: useModal 구현
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { unBlockingWithCallback } = useRouteControl(() => setIsOpen(true));

	return (
		<ApiErrorBoundary>
			<main className="customPageWrapper">
				{isOpen && (
					<div style={{ position: 'fixed', top: '50%', left: '50%' }}>
						<h1>라우터 변화 감지 모달</h1>
						<div style={{ color: 'white' }}>
							<button onClick={() => setIsOpen(false)}>취소</button>
							<button onClick={() => unBlockingWithCallback()}>나가기</button>
						</div>
					</div>
				)}
				<Funnel>
					<Funnel.Step name="position">
						<PositionTemp
							next={() => setStep('stack')}
							setStepState={setStepState}
						/>
					</Funnel.Step>
					<Funnel.Step name="stack">
						<StackTemp
							selected={selected.stack}
							next={() => setStep('time')}
							setStepState={setStepState}
						/>
					</Funnel.Step>
					<Funnel.Step name="time">
						<TimeTemp
							selected={selected.time}
							next={() => setStep('result')}
							setStepState={setStepState}
						/>
					</Funnel.Step>
					<Funnel.Step name="result">
						<ResultTemp selected={selected} />
					</Funnel.Step>
				</Funnel>
			</main>
		</ApiErrorBoundary>
	);
}
export default CustomPage;
