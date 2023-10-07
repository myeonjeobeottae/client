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
	const { query, pathname } = useRouter();
	const isQuestion = !!query.q;
	const viewBackBtn = pathname !== '/' && !isQuestion;

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
			{viewBackBtn ? (
				<BackButton>
					<IconBack />
				</BackButton>
			) : null}

			{children}
		</div>
	);
}

export default Layout;
