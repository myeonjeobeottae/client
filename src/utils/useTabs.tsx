import Button from '@atoms/button';
import { useState, MouseEvent } from 'react';
import SelectedStacks from '@organisms/selectedStacks';

type returnType = [Tab: any, selected: string[]];

export function useTabs<T extends Record<string, any[]>>(options: {
	initialMenu: keyof T;
	tabData: T;
}): returnType {
	const [menu, setMenu] = useState<keyof T>(options.initialMenu);
	const [selected, setSelected] = useState<string[]>([]);

	const setClickState = (e: MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLButtonElement;
		const value = target.innerText;
		if (value && target instanceof HTMLButtonElement) {
			const isTabMenu = options.tabData[value] !== undefined;
			if (isTabMenu) {
				setMenu(value);
			} else {
				if (!selected.includes(value)) {
					setSelected((prev) => {
						return [...prev, value];
					});
				}
			}
		}
	};

	const Menu = () => {
		return (
			<div onClick={setClickState}>
				{Object.keys(options.tabData).map((key) => {
					return (
						<Button
							key={key}
							className={key === menu ? 'selected' : undefined}
							style={{ color: 'white' }}
							data-testid={'skillMenu'}
						>
							{key}
						</Button>
					);
				})}
			</div>
		);
	};

	const MenuItems = () => {
		return (
			<div onClick={setClickState} style={{ outline: 'solid red' }}>
				{options.tabData[menu].map((item) => {
					return (
						<Button
							key={item}
							data-testid={'menuItem'}
							style={{ color: 'white', outline: 'solid blue' }}
						>
							{item}
						</Button>
					);
				})}
			</div>
		);
	};

	const Tabs = ({
		children,
	}: {
		children: React.ReactElement | React.ReactElement[];
	}) => {
		return children;
	};

	Tabs.Menu = Menu;
	Tabs.MenuItems = MenuItems;
	Tabs.SelectedStacks = () => (
		<SelectedStacks selected={selected} setSelected={setSelected} />
	);
	return [Tabs, selected];
}
