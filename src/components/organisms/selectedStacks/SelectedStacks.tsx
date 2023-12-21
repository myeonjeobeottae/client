import { ButtonImageItem } from '@molecules/ButtonItem';
import { IconSearch } from '@svgs/index';
import { useEffect, useState } from 'react';

type SelectedTy<T extends string> = {
	[P in T]?: string;
};

interface PropTypes {
	selected: any;
	setStepState: (stepData: string) => void;
	selectedItems: string[];
}

function SelectedStacks({ selected, setStepState, selectedItems }: PropTypes) {
	const [items, setItems] = useState(selected['stack'] ?? []);
	const toArrayItems = Array.isArray(items) ? [] : items.split(',');

	//items = 'stac,stac'
	useEffect(() => {
		if (JSON.stringify(toArrayItems) !== JSON.stringify(selectedItems)) {
			setStepState(selectedItems.toString());
		}
	}, [selectedItems]);

	// selected.stack? = []

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget as HTMLButtonElement;
		const value = target.ariaLabel;
		console.log(target, value);
		if (value) {
			const deleteTargetArray = [...toArrayItems].filter((el) => el !== value);
			setStepState(deleteTargetArray.toString());
		}
	};

	return (
		<ul
			className={'selectedStacks'}
			style={{ outline: 'solid white', width: '200px', height: '50px' }}
			data-testid={'selectedStacks'}
		>
			{toArrayItems.map((stack: string, i: number) => {
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
