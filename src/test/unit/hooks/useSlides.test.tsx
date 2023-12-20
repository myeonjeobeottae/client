import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@test/test-utils';
import useSlides from '@utils/hooks/useSlides';
import { act } from 'react-dom/test-utils';

describe('useSlides', () => {
	it('slideData가 배열이 아니면 slideData 하나가 렌더된다.', async () => {
		const slideData = 'testData';

		function TestComponent() {
			const [Slides] = useSlides(slideData);

			return (
				<Slides>
					{(slideIdx: number) => <Slides.items slideIdx={slideIdx} />}
				</Slides>
			);
		}
		renderWithQueryClient(<TestComponent />);

		expect(await screen.findByText('testData'));
	});

	it('slideData가 배열이면 options.view 만큼 slide가 렌더된다.', async () => {
		// framer-motion animation - useInterval 시간차 테스트 필요

		const slideData = ['1번째 슬라이드', '2번째 슬라이드'];

		function TestComponent() {
			const [Slides] = useSlides(slideData, { view: 2 });

			return (
				<Slides>
					{(slideIdx: number) => <Slides.items slideIdx={slideIdx} />}
				</Slides>
			);
		}
		renderWithQueryClient(<TestComponent />);
		expect(await screen.findByText('1번째 슬라이드')).toBeInTheDocument();
		expect(await screen.findByText('2번째 슬라이드')).toBeInTheDocument();
	});
	// it('options test');
});
