import { renderWithQueryClient } from '@test/test-utils';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { useTabs } from '@utils/useTabs';

beforeEach(() => {
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
	};

	function TestComponent() {
		const [테스트Tabs, selected] = useTabs({
			initialMenu: 'skill',
			tabData,
		});
		return (
			<>
				<테스트Tabs>
					<테스트Tabs.Menu />
					<테스트Tabs.MenuItems />
				</테스트Tabs>
				<div>
					<ul>
						{selected.map((stack, i) => {
							return (
								<li key={i} data-testid={'selectedStack'}>
									{stack}
								</li>
							);
						})}
					</ul>
				</div>
			</>
		);
	}

	renderWithQueryClient(<TestComponent />);
});

describe('useTabs가 정상적으로 동작하는지 테스트', () => {
	it('기술 Menu가 선택된채로 렌더된다.', async () => {
		const button = screen
			.getAllByTestId('skillMenu')
			.find((el) => el.getElementsByClassName('selected'));
		expect(button).toHaveTextContent('skill');
	});
	it('다른 Menu 버튼을 누르면 해당 Menu의 item 들이 렌더된다.', async () => {
		const button = screen.getByRole('button', { name: 'cs' });
		expect(button).toBeInTheDocument();

		await userEvent.click(button);

		const csMenuItem = screen.getByRole('button', { name: '운영체제' });
		expect(csMenuItem).toBeInTheDocument();

		const skillMenuItem = screen
			.getAllByTestId('menuItem')
			.find((el) => el.textContent === 'React');
		expect(skillMenuItem).toBe(undefined);
	});
	it('MenuItem을 클릭할 때마다 중복없이 배열에 추가된다', async () => {
		const button = screen.getByRole('button', { name: 'cs' });
		await userEvent.click(button);

		const csMenuItemA = screen.getByRole('button', { name: '운영체제' });
		await userEvent.click(csMenuItemA);
		const csMenuItemB = screen.getByRole('button', { name: '운영체제' });
		await userEvent.click(csMenuItemB);
		const csMenuItemC = screen.getByRole('button', { name: '네트워크' });
		await userEvent.click(csMenuItemC);

		const selectedStacks = await screen.findAllByTestId('selectedStack');
		expect(selectedStacks.length).toBe(2);
	});
	it('MenuItem 사용자 검색 기능', async () => {});
});
