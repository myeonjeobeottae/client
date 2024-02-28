import customAxios from '@pages/api';
import Button from '@atoms/button';
import Loading from '@molecules/loading';
import { Suspense, useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

interface ResultProps {
	selected: {
		[key: string]: string;
	};
}

function ResultTemp({ selected }: ResultProps) {
	const fetchData = async () => {
		const data = await customAxios.post(`/interviews/custom/create`, selected);
		return data;
	};
	const [data, setData] = useState<any>();
	const { refetch } = useSuspenseQuery({
		queryKey: ['aaa'],
		queryFn: fetchData,
	});

	const createQuestions = async () => {
		try {
			refetch();
			// return data && <div>sssss</div>;
			setData(data);
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
			<Suspense fallback="lodainglodainglodainglodainglodaing">
				{data && <div>문제문제문제문제문제문제</div>}
			</Suspense>
		</div>
	);
}

export default ResultTemp;
