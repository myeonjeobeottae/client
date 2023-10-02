import Header from '@organisms/header/Header';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}

export default Layout;
