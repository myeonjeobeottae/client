import Button from '@atoms/button/Button';

interface PositionTempProps {
	next: () => void;
}

function PositionTemp({ next }: PositionTempProps) {
	return (
		<section className="positionWrapper">
			<h1>직무를 선택해 볼까요?</h1>
			<Button type="button" onClick={next}>
				next
			</Button>
		</section>
	);
}

export default PositionTemp;
