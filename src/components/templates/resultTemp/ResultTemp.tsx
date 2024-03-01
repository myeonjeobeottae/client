import Button from '@atoms/button';
import Loading from '@molecules/loading';
import storage from '@utils/localstorage';
import { useRouter } from 'next/router';
import { useCreateQuestions } from 'queries/interview/hooks';
import { Suspense } from 'react';

interface ResultProps {
	selected: {
		[key: string]: string;
	};
}

function ResultTemp({ selected }: ResultProps) {
	const router = useRouter();
	const { isPending, mutateAsync } = useCreateQuestions();

	const createQuestions = async () => {
		try {
			const data = await mutateAsync(selected);
			storage.setItem('questions', data);
			router.push('/interview?q=1');
		} catch (error) {
			throw error;
		}
	};

	if (isPending) return <Loading />;

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
			<Suspense fallback="lodainglodainglodainglodainglodaing"></Suspense>
		</div>
	);
}

export default ResultTemp;
