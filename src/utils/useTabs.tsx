import Button from '@atoms/button';
import { useState, MouseEvent } from 'react';

type returnType = [Tab: any, selected: string[]];

export function useTabs<T extends Record<string, any[]>>(options: {
	initialMenu: keyof T;
	tabData: T;
}): returnType {
	const [menu, setMenu] = useState<keyof T>(options.initialMenu);
	const [selected, setSelected] = useState<string[]>([]);

	const setClickState = (e: MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLButtonElement;
		const value = target.textContent;
		if (value) {
			if (options.tabData[value] !== undefined) {
				setMenu(value);
			} else {
				setSelected((prev) => {
					return [...prev, value];
				});
			}
		}
	};

	console.log(`selected`, selected);

	const Menu = () => {
		return (
			<div onClick={setClickState}>
				{Object.keys(options.tabData).map((key) => {
					return (
						<Button
							key={key}
							data-testId={'skillMenu'}
							data-name={key}
							style={{ color: 'white' }}
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
			<div onClick={setClickState}>
				{options.tabData[menu].map((item) => {
					return (
						<Button
							key={item}
							data-testId={'csMenuItem'}
							data-type={menu}
							style={{ color: 'white' }}
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

	return [Tabs, selected];
}
