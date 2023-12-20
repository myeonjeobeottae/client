import { ButtonImageItem } from '@molecules/ButtonItem';
import { IconSearch } from '@svgs/index';

interface PropTypes {
	selected: any[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

function SelectedStacks({ selected, setSelected }: PropTypes) {
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget as HTMLButtonElement;
		const value = target.ariaLabel;
		console.log(target, value);
		if (value) {
			setSelected((prev) => {
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
			{selected.map((stack, i) => {
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
