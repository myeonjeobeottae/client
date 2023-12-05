// import { useFunnel } from '@toss/use-funnel';
import { useFunnel } from '@utils/useFunnel';
import PositionTemp from '@templates/positionTemp/PositionTemp';
import StackTemp from '@templates/stackTemp/StackTemp';

function CustomPage() {
	const [Funnel, setStep, setStepState] = useFunnel({
		initialStep: 'position',
	});

	return (
		<main className="customPageWrapper">
			<Funnel>
				<Funnel.Step name="position">
					<PositionTemp next={() => setStep('stack')} setState={setStepState} />
				</Funnel.Step>
				<Funnel.Step name="stack">
					<StackTemp next={() => setStep('time')} setState={setStepState} />
				</Funnel.Step>
				<Funnel.Step name="time">
					<div>asdfadsfasd</div>
				</Funnel.Step>
			</Funnel>
		</main>
	);
}
export default CustomPage;
