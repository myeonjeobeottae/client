import Button from '@atoms/button';
import { useState, MouseEvent } from 'react';
import SelectedStacks from '@organisms/selectedStacks';

type returnType = [Tab: any, selectedStacks: string[]];

export function useTabs<T extends Record<string, any[]>>(options: {
	initialMenu: keyof T;
	tabData: T;
}): returnType {
	const [menu, setMenu] = useState<keyof T>(options.initialMenu);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const setClickState = (e: MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLButtonElement;
		const value = target.innerText;
		if (value && target instanceof HTMLButtonElement) {
			const isTabMenu = options.tabData[value] !== undefined;
			if (isTabMenu) {
				setMenu(value);
			} else {
				setSelectedItems((prev) => {
					return [...prev, value];
				});
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
							style={{
								color: selectedItems.includes(item) ? 'gray' : 'white',
								outline: 'solid blue',
							}}
							disabled={selectedItems.includes(item)}
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

	return [Tabs, selectedItems];
}

//1
// selected.stack = [];
//click -> setSelectedItems (setter)
//<SelectedStacks selected={selected}  setSelected={setSelectedItems} />
