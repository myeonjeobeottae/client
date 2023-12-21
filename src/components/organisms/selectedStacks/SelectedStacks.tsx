import { ButtonImageItem } from '@molecules/ButtonItem';
import { IconSearch } from '@svgs/index';
import type { SelectedTy } from '@utils/hooks/useFunnel';
import type { useFunnelType } from '@pages/[type]/custom';
import { useEffect, useState } from 'react';

interface PropTypes {
	selected: SelectedTy<useFunnelType>;
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	setState: (checkSelected: string[], selectedItems: string[]) => string[];
}

function SelectedStacks({
	selected,
	selectedItems,
	setSelectedItems,
	setState,
}: PropTypes) {
	let checkSelected = selected['stack']
		? selected['stack'].split(',')
		: ''.split('');

	console.log(checkSelected, selectedItems);

	const [item, setItem] = useState(checkSelected);

	useEffect(() => {
		console.log(setState(checkSelected, selectedItems));
		setSelectedItems(() => {
			return checkSelected;
		});
	}, []);

	useEffect(() => {
		setItem(setState(checkSelected, selectedItems));
	}, [selectedItems]);

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget as HTMLButtonElement;
		const value = target.ariaLabel;
		console.log(target, value);
		if (value) {
			setSelectedItems((prev) => {
				const deleteTarget = [...prev].filter((el) => el !== value);
				return deleteTarget;
			});
		}
	};

	return (
		<ul
			className={'selectedStacks'}
			style={{ outline: 'solid white', width: '200px', height: '50px' }}
			data-testid={'selectedStacks'}
		>
			{item.map((stack, i) => {
				return (
					<ButtonImageItem
						key={i}
						buttonContent={<IconSearch />}
						onClick={handleDelete}
						alt={stack}
						style={{ color: 'white' }}
					>
						{stack}
					</ButtonImageItem>
				);
			})}
		</ul>
	);
}

export default SelectedStacks;
