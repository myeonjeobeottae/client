import { useEffect, useState } from 'react';
import storage from '@utils/localstorage';
import { useRouter } from 'next/router';
import { LinkButton } from '@atoms/button/LinkButton';
import InterviewForm from '@molecules/form/InterviewForm';
import { useFeedbackMutation } from 'queries/interview/hooks';
import { postFeedback } from '@pages/api/interview';
import customAxios from '@pages/api';

interface questionState {
	id: number;
	interviewId: number;
	question: string;
}

function Interview() {
	const {
		query: { q },
	} = useRouter();
	const [questionData, setQuestionData] = useState<questionState>();
	const { mutateAsync } = useFeedbackMutation();
	const question = questionData?.question;

	useEffect(() => {
		const questions = storage.getItem('questions') || '';
		const target = questions[Number(q) - 1];

		setQuestionData(target);
	}, []);
	/**
 * axios({
  method: 'get',
  url: '/example.pdf',
  responseType: 'stream'
})
.then(response => {

  response.data.on('data', (chunk) => {
    // logic to process stream data
  });

  response.data.on('end', () => {
    // logic for stream complete
  });

}); 
 */
	const handleSubmit = async (answer: string) => {
		if (!question) {
			return;
		}
		// mutateAsync({ question, answer });
		const data = customAxios
			.post(
				`/question/create/feedback`,

				{
					question,
					answer,
				},
				{
					responseType: 'stream',
				},
			)
			.then((response) => {
				response.data.on('data', (chunk: any) => {
					console.log('🚀 ~ response.data.on ~ chunk:', chunk);
					// logic to process stream data
				});

				response.data.on('end', () => {
					// logic for stream complete
				});
			});

		// 		const reader = response.body.getReader();
		// const decoder = new TextDecoder();
		// const loopRunner = true;

		// while (loopRunner) {
		// 	// Here we start reading the stream, until its done.
		// 	const { value, done } = await reader.read();
		// 	if (done) {
		// 		break;
		// 	}
		// 	const decodedChunk = decoder.decode(value, { stream: true });
		// 	setAnswer((answer) => answer + decodedChunk); // update state with new chunk
		// }
	};

	return (
		<main className="interviewPageWrapper">
			<h1>{question}</h1>
			<section>
				<InterviewForm onSub={handleSubmit} />
				<div>streamidng</div>
				<LinkButton href={`/interview?q=${Number(q) + 1}`}>다음</LinkButton>
			</section>
		</main>
	);
}

export default Interview;
