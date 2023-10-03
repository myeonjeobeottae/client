import Button from '@atoms/button/Button';
import { useRouter } from 'next/router';

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function BackButton({ children, ...props }: PropTypes) {
	const router = useRouter();
	return (
		<Button onClick={() => router.back()} {...props}>
			{children}
		</Button>
	);
}
