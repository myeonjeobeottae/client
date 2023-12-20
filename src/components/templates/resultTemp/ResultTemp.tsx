import { selectedStateType } from '@utils/hooks/useFunnel';

interface ResultProps {
	selected: selectedStateType;
}

function ResultTemp({ selected }: ResultProps) {
	console.log('🚀 ~ file: ResultTemp.tsx:8 ~ ResultTemp ~ selected:', selected);

	return (
		<div>
			<section className="positionWrapper">
				<ul className="tips">
					{Object.entries(selected).map(([category, select]) => {
						if (Array.isArray(select)) {
							return (
								<li className="tip" key={category}>
									<h3 className="title">{category}</h3>
									{select.map((value, i) => (
										<p key={i}>{value}</p>
									))}
								</li>
							);
						}
						return (
							<li className="tip" key={category}>
								<h3 className="title">{category}</h3>
								<p>{select}</p>
							</li>
						);
					})}
				</ul>
			</section>
		</div>
	);
}

export default ResultTemp;
