import React, { useState } from 'react';

type ReturnType = [Modal: any, HandleOpen: () => void];

function useModal(): ReturnType {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const HandleOpen = () => {
		setIsOpen(true);
	};

	const HandleClose = () => {
		setIsOpen(false);
	};

	//FIXME: to SCSS
	const overlayStyle = {
		position: 'fixed',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		zIndex: '999',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	} as const;
	const Overlay = () => {
		return <div style={overlayStyle}></div>;
	};

	const Title = ({ children }: { children: React.ReactNode }) => {
		return (
			<h1 style={{ color: 'white', position: 'relative', zIndex: '999' }}>
				{children}
			</h1>
		);
	};

	interface CancelButton {
		children: React.ReactNode;
	}

	const CancelButton = ({ children }: CancelButton) => {
		return (
			<div style={{ position: 'relative', zIndex: '999' }}>
				<button
					style={{ color: 'white' }}
					onClick={() => {
						setIsOpen(false);
						// window.history.pushState(null, '', router.asPath);
					}}
				>
					{children}
				</button>
			</div>
		);
	};

	interface ExecuteButtonType {
		children: React.ReactNode;
		unBlockingWithCallback: () => void;
	}

	const ExecuteButton = ({
		children,
		unBlockingWithCallback,
	}: ExecuteButtonType) => {
		return (
			<div style={{ position: 'relative', zIndex: '999' }}>
				<button
					style={{ color: 'white' }}
					onClick={() => unBlockingWithCallback()}
				>
					{children}
				</button>
			</div>
		);
	};

	const Modal = ({ children }: { children: React.ReactNode }) => {
		return (
			<>
				{isOpen && (
					<div style={{ position: 'fixed', top: '50%', left: '50%' }}>
						{children}
					</div>
				)}
			</>
		);
	};
	Modal.Overlay = Overlay;
	Modal.Title = Title;
	Modal.CancelButton = CancelButton;
	Modal.ExecuteButton = ExecuteButton;

	return [Modal, HandleOpen];
}

export default useModal;
