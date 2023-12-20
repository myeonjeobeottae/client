import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface BackgroundProps {
	src: StaticImageData;
}

function Background({ src }: BackgroundProps) {
	return (
		<Image
			src={src}
			sizes="100vw"
			alt="Background Image"
			fill
			style={{ objectFit: 'cover', position: 'absolute', zIndex: `-1` }}
		/>
	);
}

export default Background;
