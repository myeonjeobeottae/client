import { IconSpinner } from '@svgs/index';
import useSlides from '@utils/hooks/useSlides';

const slideData = ['1번째 슬라이드', '2번째 슬라이드', '3번째 슬라이드'];

function Loading() {
	const [Slides] = useSlides(slideData);
	// const [Slides] = useSlides(undefined, { simple: true });
	return (
		<div>
			<IconSpinner />
			{/* <Slides>Test</Slides> */}
			<Slides>
				{(slideIdx: number) => <Slides.items slideIdx={slideIdx} />}
			</Slides>
		</div>
	);
}

export default Loading;
