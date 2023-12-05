import Button from '@atoms/button/Button';
import { MouseEvent } from 'react';

interface PositionTempProps {
	next: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
	setState: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function StackTemp({ next, setState }: PositionTempProps) {
	return (
		<section className="positionWrapper">
			<h1 className="title">세부 기술을 선택해 주세요.</h1>
			<div className="selectBtns">
				<Button
					className="selected"
					type="button"
					onClick={next}
					data-testId={'skillMenu'}
				>
					기술
				</Button>
				<Button className="frontEnd" type="button" onClick={next}>
					CS
				</Button>
				<Button type="button" onClick={setState} data-testId={'skillMenuItem'}>
					기술
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

export default StackTemp;
