import customAxios from '..';

export const postQuestions = async (selected: { [key: string]: string }) => {
	try {
		const data = await customAxios.post(`/interviews/custom/create`, selected);
		return data;
	} catch (error) {}
};

export const postFeedback = async (question: string, answer: string) => {
	try {
		const data = await customAxios.post(`/question/create/feedback`, {
			question,
			answer,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

// const response = await fetch('http://localhost:2000/aiCompletion', {
// 	method: 'post',
// 	headers: {
// 		Accept: 'application/json, text/plain, /',
// 		'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({ userPrompt: prompt }),
// });
// if (!response.ok || !response.body) {
// 	throw response.statusText;
// }

// // Here we start prepping for the streaming response
// const reader = response.body.getReader();
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
