import HomeLogoGray from '@images/landingPage/logo-gray.png';
import Image from 'next/image';
import { LinkButton } from '@atoms/button/LinkButton';
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
				<LinkButton className="logoMid" href={'/'}>
					<Image src={homeLogo()} alt={`Home Logo Image`} />
				</LinkButton>
			);
		case 'big':
			return (
				<LinkButton className="logoBig" href={'/'}>
					<Image src={homeLogo()} alt={`Home Logo Image`} />
				</LinkButton>
			);
	}
}

export default Logo;
