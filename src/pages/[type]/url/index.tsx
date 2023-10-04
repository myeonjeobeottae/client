import { useTextInput } from '@atoms/input/Input';
import Button from '@atoms/button/Button';
import { BackButton } from '@atoms/button/BackButton';
import { IconWantedLogo } from '@svgs/index';

export default function UrlPage() {
	const [value, urlInput] = useTextInput({
		id: 'url-input',
		placeholder: 'wanted 채용 공고 URL을 입력해주세요',
		className: 'urlInput',
	});

	return (
		<main className="url-page-wrapper">
			<section className="container">
				<label htmlFor="url-input">
					<IconWantedLogo />
				</label>
				<form className="urlForm">
					{urlInput}
					<Button className="submitButton">분석하기</Button>
				</form>
			</section>
			<BackButton className="backButton">뒤로가기</BackButton>
		</main>
	);
}
