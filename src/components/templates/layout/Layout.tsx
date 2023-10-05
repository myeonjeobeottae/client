import Header from '@organisms/header/Header';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Background from '@images/landingPage/bg.png';
import { IconBack } from '@svgs/index';
import { BackButton } from '@atoms/button/BackButton';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	const { query } = useRouter();
	const isQuestion = !!query.q;

	return (
		<div className="layoutWrapper">
			<Image
				src={Background}
				sizes="100vw"
				fill
				quality={100}
				style={{ objectFit: 'cover', position: 'absolute', zIndex: '-1' }}
				alt="Background Image"
			/>
			<Header />
			<BackButton>
				<IconBack />
			</BackButton>

			{children}
		</div>
	);
}

export default Layout;
