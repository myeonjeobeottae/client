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
					<PositionTemp next={() => setStep('stack')} />
				</Funnel.Step>
				<Funnel.Step name="stack">
					<PositionTemp next={() => setStep('test')} />
				</Funnel.Step>
				<Funnel.Step name="test">
					<div>asdfadsfasd</div>
				</Funnel.Step>
			</Funnel>
		</main>
	);
}
export default CustomPage;
