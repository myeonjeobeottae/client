import Button from '@atoms/button/Button';
import { MouseEvent } from 'react';
import { useTabs } from '@utils/useTabs';
import SelectedStacks from '@organisms/selectedStacks';
import type { selectedStateType } from '@utils/hooks/useFunnel';

interface StackTempProps {
	selected: {};
	next: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
	setStepState: (stepData: string) => void;
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

function StackTemp({ selected, next, setStepState }: StackTempProps) {
	console.log(selected);
	const [Tabs, selectedItems] = useTabs({
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
				</Tabs>
				<SelectedStacks
					selected={selected}
					setStepState={setStepState}
					selectedItems={selectedItems}
				/>
			</div>
			<Button
				style={{ color: !selectedItems?.length ? 'gray' : 'white' }}
				onClick={(e) => {
					next(e);
					setStepState(selectedItems.toString());
				}}
				disabled={!selectedItems?.length}
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
