import { useTextInput } from '@atoms/input/Input';
import Button from '@atoms/button/Button';
import { BackButton } from '@atoms/button/BackButton';
import { IconSearch, IconWantedLogo } from '@svgs/index';

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
					<Button className="submitButton">
						<IconSearch />
					</Button>
				</form>
			</section>
			<ul className="tips">
				<li className="tip">
					원티드에서 희망하는 채용 공고 url을 분석해서 질문을 생성해요.
				</li>
				<li className="tip">
					내가 직접 질문 환경(직무, 세부 기술 등)을 설정해요.
				</li>
			</ul>
		</main>
	);
}
