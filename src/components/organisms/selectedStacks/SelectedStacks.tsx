import { ButtonImageItem } from '@molecules/buttonItem/ButtonItem';
import { IconSearch } from '@svgs/index';
import type { SelectedTy } from '@utils/hooks/useFunnel';
import type { useFunnelType } from '@pages/[type]/custom';
import { useEffect, useState } from 'react';

interface PropTypes {
	selected: SelectedTy<useFunnelType>;
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	stackAddAndDelete: (selectedItems: string[]) => string[];
}

function SelectedStacks({
	selected,
	selectedItems,
	setSelectedItems,
	stackAddAndDelete,
}: PropTypes) {
	const [stacks, setStacks] = useState(stackAddAndDelete(selectedItems));

	useEffect(() => {
		setSelectedItems(() => {
			return selected['stack'] ? selected['stack'].split(',') : [];
		});
	}, []);

	useEffect(() => {
		setStacks(stackAddAndDelete(selectedItems));
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
			{stacks.map((stack, i) => {
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
