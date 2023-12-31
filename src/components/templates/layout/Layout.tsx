import Header from '@organisms/header/Header';
import Image from 'next/image';
import Background from '@images/landingPage/bg.png';
import ConditionBackButton from './ConditionBackButton';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
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
			//FIXME: ConditionBackButton 한뎁스 내리기
			<ConditionBackButton />
			{children}
		</div>
	);
}

export default Layout;
