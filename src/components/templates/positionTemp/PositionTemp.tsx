import Button from '@atoms/button/Button';

interface PositionTempProps {
	next: () => void;
	setStepState: (stepData: string) => void;
}

const positionData = ['프론트엔드', '백엔드'];

function PositionTemp({ next, setStepState }: PositionTempProps) {
	return (
		<section className="positionWrapper">
			<h1 className="title">직무를 선택해 주세요.</h1>
			<div className="selectBtns">
				{positionData.map((position) => {
					return (
						<Button
							key={position}
							//TODO: classname 통일
							className="frontEnd"
							type="button"
							onClick={(e) => {
								next();
								setStepState(e.currentTarget.innerText);
							}}
						>
							{position}
						</Button>
					);
				})}
			</div>
			<ul className="tips">
				<li className="tip">
					원티드에서 희망하는 채용 공고 url을 분석해서 질문을 생성해요.
				</li>
				<li className="tip">
					내가 직접 질문 환경(직무, 세부 기술 등)을 설정해요.
				</li>
			</ul>
		</section>
	);
}

export default PositionTemp;
