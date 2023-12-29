import PositionTemp from '@templates/positionTemp';
import StackTemp from '@templates/stackTemp';
import TimeTemp from '@templates/timeTemp';
import ResultTemp from '@templates/resultTemp';
import useFunnel from '@utils/hooks/useFunnel';
import { ApiErrorBoundary } from '@templates/errorBoundary';
import useRouteControl from '@utils/hooks/useRouteControl';
import useModal from '@utils/hooks/useModal';

export type useFunnelType = 'position' | 'stack' | 'time' | 'result';

function CustomPage() {
	const [Funnel, selected, setStep, setStepState] = useFunnel<useFunnelType>({
		initialStep: 'position',
	});
	//TODO: useModal 구현
	const [Modal, HandleOpen, HandleDelete] = useModal();
	const { unBlockingWithCallback } = useRouteControl(HandleOpen);

	return (
		<ApiErrorBoundary>
			<main className="customPageWrapper">
				<Modal>
					<Modal.Title>라우터 감지 모달</Modal.Title>
					<Modal.Content unBlockingWithCallback={unBlockingWithCallback} />
				</Modal>
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
