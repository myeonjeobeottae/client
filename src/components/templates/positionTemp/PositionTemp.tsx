import Button from '@atoms/button/Button';
import { MouseEvent } from 'react';

interface PositionTempProps {
	next: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

function PositionTemp({ next }: PositionTempProps) {
	return (
		<section className="positionWrapper">
			<h1 className="title">직무를 선택해 주세요.</h1>
			<div className="selectBtns">
				<Button
					className="frontEnd"
					data-name="프론트엔드"
					type="button"
					onClick={next}
				>
					프론트엔드
				</Button>
				<Button
					className="backEnd"
					data-name="백엔드"
					type="button"
					onClick={next}
				>
					백엔드
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
