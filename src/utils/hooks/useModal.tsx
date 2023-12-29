import React, { useState } from 'react';
import { useRouter } from 'next/router';

type ReturnType = [Modal: any, HandleOpen: () => void, HandleClose: () => void];

function useModal(): ReturnType {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const HandleOpen = () => {
		setIsOpen(true);
	};

	const HandleClose = () => {
		setIsOpen(false);
	};

	function Title({ children }: { children: React.ReactNode }) {
		return <h1>{children}</h1>;
	}

	function Content({
		unBlockingWithCallback,
	}: {
		unBlockingWithCallback: any;
	}) {
		return (
			<div style={{ color: 'white' }}>
				<button
					onClick={() => {
						setIsOpen(false);
						// window.history.pushState(null, '', router.asPath);
					}}
				>
					취소
				</button>
				<button onClick={() => unBlockingWithCallback()}>나가기</button>
			</div>
		);
	}

	function Modal({ children }: { children: React.ReactNode }) {
		return (
			<>
				{isOpen && (
					<div style={{ position: 'fixed', top: '50%', left: '50%' }}>
						{children}
					</div>
				)}
			</>
		);
	}

	Modal.Title = Title;
	Modal.Content = Content;

	return [Modal, HandleOpen, HandleClose];
}

export default useModal;
