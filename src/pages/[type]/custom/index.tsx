// import { useFunnel } from '@toss/use-funnel';
import useFunnel from '@utils/useFunnel';
import PositionTemp from '@templates/positionTemp/PositionTemp';

function CustomPage() {
	const [Funnel, setStep] = useFunnel({
		initialStep: 'position',
	});

	return (
		<main>
			<Funnel>
				<Funnel.Step name="position">
					<PositionTemp next={() => setStep('stack')} />
				</Funnel.Step>
				<Funnel.Step name="stack">
					<div>asdfadsfasd</div>
				</Funnel.Step>
			</Funnel>
		</main>
	);
}

export default CustomPage;
