import PositionTemp from '@templates/positionTemp';
import StackTemp from '@templates/stackTemp';
import TimeTemp from '@templates/timeTemp';
import Loading from '@atoms/loading/Loading';
import ResultTemp from '@templates/resultTemp';
import useFunnel from '@utils/hooks/useFunnel';
import { ApiErrorBoundary } from '@templates/errorBoundary';
import { Suspense } from 'react';

export type useFunnelType = 'position' | 'stack' | 'time' | 'result';

function CustomPage() {
	const [Funnel, selected, setStep, setStepState] = useFunnel<useFunnelType>({
		initialStep: 'position',
	});

	return (
		<ApiErrorBoundary>
			<Suspense fallback={<Loading />}>
				<main className="customPageWrapper">
					<Funnel>
						<Funnel.Step name="position">
							<PositionTemp
								next={() => setStep('stack')}
								setStepState={setStepState}
							/>
						</Funnel.Step>
						<Funnel.Step name="stack">
							<StackTemp
								selected={selected}
								next={() => setStep('time')}
								setStepState={setStepState}
							/>
						</Funnel.Step>
						<Funnel.Step name="time">
							<TimeTemp
								selected={selected}
								next={() => setStep('result')}
								setStepState={setStepState}
							/>
						</Funnel.Step>
						<Funnel.Step name="result">
							<ResultTemp selected={selected} />
						</Funnel.Step>
					</Funnel>
				</main>
			</Suspense>
		</ApiErrorBoundary>
	);
}
export default CustomPage;
