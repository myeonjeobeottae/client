// import { useFunnel } from '@toss/use-funnel';
import { useFunnel } from '@utils/useFunnel';
import PositionTemp from '@templates/positionTemp/PositionTemp';

function CustomPage() {
	const [Funnel, setStep] = useFunnel({
		initialStep: 'position',
	});

	return (
		<main className="customPageWrapper">
			<Funnel>
				<Funnel.Step name="position">
					<PositionTemp next={(e) => setStep('stack', e)} />
				</Funnel.Step>
				<Funnel.Step name="stack">
					<PositionTemp next={(e) => setStep('time', e)} />
				</Funnel.Step>
				<Funnel.Step name="time">
					<div>asdfadsfasd</div>
				</Funnel.Step>
			</Funnel>
		</main>
	);
}
export default CustomPage;
