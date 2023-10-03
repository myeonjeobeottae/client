import { useTextInput } from '@atoms/input/Input';
import Button from '@atoms/button/Button';
import { BackButton } from '@atoms/button/BackButton';

export default function UrlPage() {
	const [value, urlInput] = useTextInput({
		id: '12',
		placeholder: 'wanted 채용 공고 URL을 입력해주세요',
	});

	return (
		<main>
			<form>
				{urlInput}
				<Button>확인</Button>
			</form>
			<BackButton>뒤로가기</BackButton>
		</main>
	);
}
