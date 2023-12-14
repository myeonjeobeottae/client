import { useFunnel } from '@utils/useFunnel';
import PositionTemp from '@templates/positionTemp';
import StackTemp from '@templates/stackTemp';
import TimeTemp from '@templates/timeTemp';

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
						next={() => setStep('last')}
						setStepState={setStepState}
					/>
				</Funnel.Step>
			</Funnel>
		</main>
	);
}
export default CustomPage;
