import HomeLogoGray from '@images/landingPage/logo-gray.png';
import Image from 'next/image';

interface LogoProps {
	size: 'mid' | 'big';
}

function Logo({ size }: LogoProps) {
	switch (size) {
		case 'mid':
			return (
				<div className="logoMid">
					<Image src={HomeLogoGray} alt={`Home Logo Image`} />
				</div>
			);
		case 'big':
			return (
				<div className="logoBig">
					<Image src={HomeLogoGray} alt={`Home Logo Image`} />
				</div>
			);
	}
}

export default Logo;
