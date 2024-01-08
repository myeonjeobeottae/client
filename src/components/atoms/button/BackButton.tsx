import Button from '@atoms/button/Button';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function BackButton({ children, ...props }: PropTypes) {
	const router = useRouter();
	const HandleBackRoute = useCallback(() => {
		if (router.asPath === '/chat') {
			router.replace('/');
		} else {
			router.back();
		}
	}, [router.asPath]);

	return (
		<Button onClick={HandleBackRoute} {...props}>
			{children}
		</Button>
	);
}
