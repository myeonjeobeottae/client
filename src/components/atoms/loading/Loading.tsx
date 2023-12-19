import { IconSpinner } from '@svgs/index';
import useSlides from '@utils/useSlides';

const slideData = ['1번째 슬라이드', '2번째 슬라이드', '3번째 슬라이드'];

function Loading() {
	const [Slides] = useSlides(slideData);
	return (
		<div>
			<IconSpinner />
			<Slides>
				{(slideIdx: number) => <Slides.items slideIdx={slideIdx} />}
			</Slides>
		</div>
	);
}

export default Loading;
