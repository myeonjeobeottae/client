import Button from '@atoms/button';
import { useState } from 'react';
import type { selectedStateType } from '@utils/hooks/useFunnel';

interface PropTypes {
	selected: selectedStateType['time'];
	next: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
	setStepState: (stepData: string) => void;
}

const timeData = {
	제한없음: 'noLimit',
	'3분': '3',
	'5분': '5',
};

function TimeTemp({ selected, next, setStepState }: PropTypes) {
	const [time, setTime] = useState(selected);
	return (
		<section className="stackWrapper">
			<h1 className="title">문제당 제한시간을 선택해 주세요.</h1>
			<div className="selectBtns">
				{Object.entries(timeData).map(([k, v]) => {
					console.log(k, v, typeof v, typeof time);
					return (
						<Button
							key={k}
							className={v === time ? 'selected' : undefined}
							onClick={() => setTime(v)}
							style={{
								color: 'white',
								outline: v === time ? 'solid white' : undefined,
							}}
						>
							{k}
						</Button>
					);
				})}
			</div>
			<Button
				style={{ color: 'white' }}
				onClick={(e) => {
					next(e);
					setStepState(time);
				}}
			>
				다음
			</Button>
			<ul className="tips">
				<li className="tip">설정한 제한시간내에 문제의 답을 제출해야해요.</li>
				<li className="tip">처음이라면, 기본 3분을 추천해요.</li>
			</ul>
		</section>
	);
}

export default TimeTemp;
