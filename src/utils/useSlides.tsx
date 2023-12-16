type SlideOptions = {
	view?: number | undefined;
	direction?: 'top' | 'right' | 'bottom' | 'left' | undefined;
	duration?: number | undefined;
	delay?: number | undefined;
	iteration?: number | 'infinity' | undefined;
};

const DefaultSlideOptions: SlideOptions = {
	view: 3,
	direction: 'top',
	duration: 1,
	delay: 2,
	iteration: 'infinity',
};

interface SlidesProps {
	children: React.ReactNode | React.ReactNode[];
}

function useSlides(
	slideData: string | any[],
	options: SlideOptions = DefaultSlideOptions,
) {
	//세부 컴포넌트
	//Slide
	const Slide = ({ children }: { children: React.ReactNode }) => {
		let content;
		//case 1 : slideData가 arr가 아닐때
		if (typeof slideData === 'string') {
			return <div>{slideData}</div>;
		}
		//case 2 : slideData가 arr 이면서 options가 없을 때,

		//case 3 : slideData가 arr 이면서 options가 있을 때,
	};

	//메인 컴포넌트
	const Slides = ({ children }: SlidesProps) => {
		let targetSlide;

		return targetSlide;
	};

	Slides.items = Slide;

	return [Slides];
}

export default useSlides;
