import Button from '@atoms/button/Button';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function BackButton({ children, ...props }: PropTypes) {
	const router = useRouter();
	useEffect(() => {
		window.history.pushState(null, '', router.asPath);
	}, []);

	return (
		<Button onClick={() => router.back()} {...props}>
			{children}
		</Button>
	);
}
