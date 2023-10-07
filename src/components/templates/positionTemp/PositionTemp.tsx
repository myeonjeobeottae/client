import Button from '@atoms/button/Button';

interface PositionTempProps {
	next: () => void;
}

function PositionTemp({ next }: PositionTempProps) {
	return (
		<section className="positionWrapper">
			<h1 className="title">직무를 선택해 볼까요?</h1>
			<div className="selectBtns">
				<Button className="frontEnd" type="button">
					프론트엔드
				</Button>
				<Button className="backEnd" type="button">
					백엔드
				</Button>
				<Button type="button" onClick={next}>
					next
				</Button>
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
