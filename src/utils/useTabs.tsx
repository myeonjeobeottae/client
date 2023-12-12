import Button from '@atoms/button';
import { MenuItems } from '@templates/stackTemp/StackTemp';
import { useState, MouseEvent } from 'react';

export function useTabs(options: {
	initialMenu: keyof MenuItems;
	MENU_ITEMS: MenuItems[];
	setStepState: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}) {
	const [menu, setMenu] = useState<keyof MenuItems>(options.initialMenu);

	const setMenuState = (e: MouseEvent<HTMLButtonElement>) => {
		if (!e.currentTarget.dataset.name) {
			return;
		}
		const name = e.currentTarget.dataset.name as keyof MenuItems;
		setMenu(name);
	};

	const Menu = () => {
		return (
			<>
				{options.MENU_ITEMS.map((el) => (
					<>
						{Object.keys(el).map((key) => (
							<Button
								data-testId={'skillMenuItem'}
								data-name={key}
								onClick={setMenuState}
							>
								{key}
							</Button>
						))}
					</>
				))}
			</>
		);
	};

	const MenuItems = () => {
		return (
			<div
				onClick={(e) => {
					options.setStepState(e);
				}}
			>
				{options.MENU_ITEMS.map(
					(el) =>
						el[menu]?.map((item) => (
							<Button data-testId={'csMenuItem'} data-type={menu}>
								{item}
							</Button>
						)),
				)}
			</div>
		);
	};

	const Tab = ({
		children,
	}: {
		children: React.ReactElement | React.ReactElement[];
	}) => {
		return children;
	};

	Tab.Menu = Menu;
	Tab.MenuItems = MenuItems;

	return [Tab];
}

// <Tab>
// 	<Tab.Menu></Tab.Menu>
// 	<Tab.MenuItems></Tab.MenuItems>
// </Tab>;
