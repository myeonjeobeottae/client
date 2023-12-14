import Button from '@atoms/button/Button';
import { MouseEvent } from 'react';
import { useTabs } from '@utils/useTabs';

interface PositionTempProps {
	next: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
	setStepState: (e: React.MouseEvent<HTMLElement>, tabData: any[]) => void;
}

const tabData = {
	skill: [
		'React',
		'Next.js',
		'TypeScript',
		'Java',
		'JavaScript',
		'Python',
		'C++',
		'Linux',
	],

	cs: [
		'운영체제',
		'네트워크',
		'컴퓨터구조',
		'자료구조',
		'알고리즘',
		'데이터베이스',
	],
	케케케: [1, false, '컴퓨터구조', '자료구조', '알고리즘', '데이터베이스'],
};

function StackTemp({ next, setStepState }: PositionTempProps) {
	const [Tabs, selected] = useTabs({
		initialMenu: 'skill',
		tabData,
	});

	return (
		<section className="stackWrapper">
			<h1 className="title">세부 기술을 선택해 주세요.</h1>
			<div className="selectBtns">
				<Tabs>
					<Tabs.Menu />
					<Tabs.MenuItems />
					<Tabs.SelectedStacks />
				</Tabs>
			</div>
			{/* TODO: 아이템 담겨잇는게 없으면 클릭되면 안됌 */}
			<Button
				style={{ color: 'white' }}
				onClick={(e) => {
					next(e);
					setStepState(e, selected);
				}}
			>
				다음
			</Button>
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
