import Link from 'next/link';
import React from 'react';

interface PropTypes extends React.LinkHTMLAttributes<HTMLAnchorElement> {
	children: React.ReactNode;
	href: string;
}

export function LinkButton({ href, children, ...props }: PropTypes) {
	return (
		<Link className="linkBtn" href={href} {...props}>
			{children}
		</Link>
	);
}
