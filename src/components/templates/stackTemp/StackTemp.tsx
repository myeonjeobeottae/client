import Button from '@atoms/button/Button';
import { useTabs } from '@utils/useTabs';
import { MouseEvent } from 'react';

interface PositionTempProps {
	next: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
	setStepState: (e: React.MouseEvent<HTMLElement>) => void;
}

export type MenuItems = {
	skill?: string[];
	cs?: string[];
};

const MENU_ITEMS: MenuItems[] = [
	{
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
	},
	{
		cs: [
			'운영체제',
			'네트워크',
			'컴퓨터구조',
			'자료구조',
			'알고리즘',
			'데이터베이스',
		],
	},
];

function StackTemp({ next, setStepState }: PositionTempProps) {
	const [Tab] = useTabs({ initialMenu: 'skill', MENU_ITEMS, setStepState });
	return (
		<section className="positionWrapper">
			<h1 className="title">세부 기술을 선택해 주세요.</h1>
			<div className="selectBtns">
				{/* <div> */}
				{/* <Button className="selected" type="button" data-testId={'skillMenu'}>
						기술
					</Button>
					<Button className="frontEnd" type="button" data-testId={'csMenu'}>
						CS
					</Button>
				</div>
				<div>
					<Button
						type="button"
						onClick={setStepState}
						data-testId={'skillMenuItem'}
						data-name={'skill'}
					>
						react
					</Button>
					<Button
						type="button"
						onClick={setStepState}
						data-testId={'skillMenuItem'}
						data-name={'skill'}
					>
						next
					</Button>
					<Button
						type="button"
						onClick={setStepState}
						data-testId={'csMenuItem'}
						data-type={'cs'}
					>
						aa
					</Button>
				</div> */}
				<Tab>
					<Tab.Menu></Tab.Menu>
					<Tab.MenuItems></Tab.MenuItems>
				</Tab>
			</div>
			<div>
				<ul>
					<li></li>
				</ul>
			</div>
			{/* TODO: 아이템 담겨잇는게 없으면 클릭되면 안됌 */}
			<Button onClick={next}>다음</Button>
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
