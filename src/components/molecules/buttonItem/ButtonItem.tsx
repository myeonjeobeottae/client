import Button from '@atoms/button';
import Image from 'next/image';

interface PropTypes
	extends React.HTMLAttributes<HTMLButtonElement | HTMLLIElement> {
	children: React.ReactNode;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonItemTypes extends PropTypes {
	buttonContent: React.ReactNode;
}

interface ButtonImageItemTypes extends PropTypes {
	buttonContent: any;
	alt: string;
}

//이미지 x 기본형
export function ButtonItem({
	children,
	onClick,
	buttonContent,
	...props
}: ButtonItemTypes) {
	return (
		<li {...props}>
			{children}
			<Button onClick={onClick}>{buttonContent}</Button>
		</li>
	);
}

//이미지 + 커스텀
export function ButtonImageItem({
	children,
	onClick,
	buttonContent,
	alt,
	...props
}: ButtonImageItemTypes) {
	//png
	if (typeof buttonContent === 'string') {
		return (
			<li {...props} style={{ color: 'white' }}>
				{children}
				<Button onClick={onClick}>
					<Image src={buttonContent} alt={alt} sizes={'40'} />
				</Button>
			</li>
		);
	} else {
		//svg component
		return (
			<li {...props}>
				{children}
				<Button onClick={onClick} aria-label={alt}>
					{buttonContent}
				</Button>
			</li>
		);
	}
}
