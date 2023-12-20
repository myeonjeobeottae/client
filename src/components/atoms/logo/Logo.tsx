import HomeLogoGray from '@images/landingPage/logo-gray.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface LogoProps {
	size: 'mid' | 'big';
}

function Logo({ size }: LogoProps) {
	const router = useRouter();
	const homeLogo = () => {
		return router.pathname === '/' ? HomeLogoGray : HomeLogoGray;
	};

	switch (size) {
		case 'mid':
			return (
				<div className="logoMid" onClick={() => router.push(`/`)}>
					<Image src={homeLogo()} alt={`Home Logo Image`} />
				</div>
			);
		case 'big':
			return (
				<div className="logoBig" onClick={() => router.push(`/`)}>
					<Image src={homeLogo()} alt={`Home Logo Image`} />
				</div>
			);
	}
}

export default Logo;
