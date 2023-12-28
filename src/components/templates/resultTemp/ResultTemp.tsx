import customAxios from '@pages/api';
import Button from '@atoms/button';

interface ResultProps {
	selected: {
		[key: string]: string;
	};
}

function ResultTemp({ selected }: ResultProps) {
	const createQuestions = async () => {
		try {
			const data = await customAxios.post(
				`/interviews/custom/create`,
				selected,
			);
			console.log('🚀 ~ file: index.tsx:24 ~ onLogin ~ data:', data);
		} catch (error) {
			throw error;
		}
	};

	return (
		<div>
			<section className="positionWrapper">
				<ul className="tips">
					{Object.entries(selected).map(([category, select]) => (
						<li className="tip" key={category}>
							<h3 className="title">{category}</h3>
							<p>{select}</p>
						</li>
					))}
				</ul>
				<Button onClick={createQuestions}>문제 생성</Button>
			</section>
		</div>
	);
}

export default ResultTemp;
