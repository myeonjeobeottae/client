import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInterval } from './useInterval';

type SlideOptions = {
	/**
	 * 한 번에 보여줄 Slide 개수
	 *
	 * view : 1(default);
	 */
	view?: 1 | 2 | 3 | undefined;
	/**
	 * direction : 'top'(default)
	 *
	 * 애니메이션 동작 방향
	 */
	direction?: 'top' | 'right' | 'bottom' | 'left' | undefined;
	/**
	 * duration : 0.5(default);
	 *
	 * === animation-duration - 애니메이션 동작 시간
	 */
	duration?: number | undefined;
	/**
	 * dealy : 4.5(default 초)
	 *
	 * delay : null - 최초 한 번만 동작
	 */
	delay?: number | undefined;
};

const DefaultSlideOptions: SlideOptions = {
	view: 1,
	direction: 'top',
	duration: 0.5,
	delay: 4.5,
};

interface SlidesProps {
	children: React.ReactNode | React.ReactNode[] | Function;
}

function wrap(min: number, max: number, v: number) {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function useSlides(
	slideData: string | any[],
	options: SlideOptions = DefaultSlideOptions,
) {
	const variants = {
		enter: (options: SlideOptions) => {
			switch (options.direction) {
				case 'top':
					return { y: 20, opacity: 0 };
				case 'right':
					return { x: '-100%', opacity: 0 };
				case 'bottom':
					return { y: -20, opacity: 0 };
				case 'left':
					return { x: '100%', opacity: 0 };
				default:
					return { y: 20, opacity: 0 };
			}
		},
		center: (options: SlideOptions) => {
			switch (options.direction) {
				case 'top':
					return { y: 0, opacity: 1 };
				case 'right':
					return { x: '0', opacity: 1 };
				case 'bottom':
					return { y: 0, opacity: 1 };
				case 'left':
					return { x: '0', opacity: 1 };
				default:
					return { y: 0, opacity: 1 };
			}
		},
		exit: (options: SlideOptions) => {
			switch (options.direction) {
				case 'top':
					return { y: -20, opacity: 0 };
				case 'right':
					return { x: '100%', opacity: 0 };
				case 'bottom':
					return { y: 20, opacity: 0 };
				case 'left':
					return { x: '-100%', opacity: 0 };
				default:
					return { y: -20, opacity: 0 };
			}
		},
	};

	//세부 컴포넌트
	//Slides.items
	const Slide = ({ slideIdx }: { slideIdx: number }) => {
		//case 1 : slideData가 arr가 아닐때
		if (typeof slideData === 'string') {
			return <div>{slideData}</div>;
		}
		//case 2 : slideData가 arr일 때
		else if (Array.isArray(slideData)) {
			return (
				<div>
					<motion.div
						variants={variants}
						custom={options}
						initial={'enter'}
						animate={'center'}
						exit={'exit'}
						transition={{ duration: options.duration }}
					>
						{slideData[slideIdx]}
					</motion.div>
				</div>
			);
		}
	};

	//메인 컴포넌트
	const Slides = ({ children }: SlidesProps) => {
		const [item, setItem] = useState(0);

		const slideIndex = wrap(0, slideData.length, item);

		const paginate = () => {
			setItem(item + 1);
		};

		useInterval(() => {
			paginate();
		}, options.delay ?? null);

		const toRender =
			typeof children === 'function' ? children(slideIndex) : children;

		return (
			<AnimatePresence mode="wait">
				<motion.div key={item}>{toRender}</motion.div>
			</AnimatePresence>
		);
	};

	Slides.items = Slide;

	return [Slides];
}

export default useSlides;
