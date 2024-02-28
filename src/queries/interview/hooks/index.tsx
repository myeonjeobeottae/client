import { postFeedback, postQuestions } from '@pages/api/interview';
import { useMutation } from '@tanstack/react-query';
import { queryKey } from '@utils/variables';

export const useCreateQuestions = () => {
	return useMutation({
		mutationKey: queryKey.question(),
		mutationFn: (selected: { [key: string]: string }) =>
			postQuestions(selected),
	});
};

export const useFeedbackMutation = () => {
	return useMutation({
		mutationKey: queryKey.question(),
		mutationFn: ({ question, answer }: { question: string; answer: string }) =>
			postFeedback(question, answer),
	});
};
