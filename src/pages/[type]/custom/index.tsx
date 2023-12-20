import { useFunnel } from '@utils/useFunnel';
import PositionTemp from '@templates/positionTemp';
import StackTemp from '@templates/stackTemp';
import TimeTemp from '@templates/timeTemp';
import Loading from '@atoms/loading/Loading';
import ResultTemp from '@templates/resultTemp';

function CustomPage() {
	const [Funnel, selected, setStep, setStepState] = useFunnel({
		initialStep: 'position',
	});

	return (
		<main className="customPageWrapper">
			<Funnel>
				<Funnel.Step name="position">
					<PositionTemp next={() => setStep('stack')} setState={setStepState} />
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
	);
}
export default CustomPage;
