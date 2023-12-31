import React from 'react';
import { IconBack } from '@svgs/index';
import { BackButton } from '@atoms/button/BackButton';
import { useRouter } from 'next/router';

function ConditionBackButton() {
	const { query, pathname } = useRouter();
	const isQuestion = !!query.q;
	const viewBackBtn = pathname !== '/' && !isQuestion;
	return (
		<div className="ConditionBackButtonWrapper">
			{viewBackBtn ? (
				<BackButton>
					<IconBack />
				</BackButton>
			) : null}
		</div>
	);
}

export default ConditionBackButton;
