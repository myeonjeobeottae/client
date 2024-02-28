import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	exampleRequired: string;
};

interface InterviewFormProps {
	onSub: (answer: string) => void;
}

function InterviewForm({ onSub }: InterviewFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data.exampleRequired);
		const answer = data.exampleRequired;

		onSub(answer);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* <input defaultValue="test" {...register('example')} /> */}
			<textarea {...register('exampleRequired', { required: true })} />

			{errors.exampleRequired && <span>This field is required</span>}

			<input type="submit" />
		</form>
	);
}

export default InterviewForm;
