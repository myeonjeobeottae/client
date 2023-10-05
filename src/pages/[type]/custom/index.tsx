import { useFunnel } from '@toss/use-funnel';
import PositionTemp from '@templates/positionTemp/PositionTemp';

function CustomPage() {
	// const [Funnel, setStep] = useFunnel(['position', 'stack'] as const, {
	// 	initialStep: 'position',
	// });

	return (
		<main>
			{/* <Funnel>
				<Funnel.Step name="position">
					<PositionTemp next={() => setStep('position')} />
				</Funnel.Step>
				<Funnel.Step name="stack">
					<div>asdfadsfasd</div>
				</Funnel.Step>
			</Funnel> */}
		</main>
	);
}

export default CustomPage;
