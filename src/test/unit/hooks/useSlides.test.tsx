import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@test/test-utils';
import useSlides from '@utils/useSlides';

describe('useSlides', () => {
	it('slideData에 기반한 slide컴포넌트가 렌더된다.', async () => {
		const slideData = ['1번째 슬라이드', '2번째 슬라이드'];

		function TestComponent() {
			const [Slides] = useSlides(slideData);

			return (
				<Slides>
					<Slides.items>sds</Slides.items>
				</Slides>
			);
		}

		renderWithQueryClient(<TestComponent />);
	});
});
