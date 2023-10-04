import Header from '@organisms/header/Header';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<div style={{ backgroundColor: 'black' }}>
			<Header />
			{children}
		</div>
	);
}

export default Layout;
