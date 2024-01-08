import { User } from 'context/Auth';
import React from 'react';
import Image from 'next/image';

function Profile({ user }: { user: User }) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '1rem',
			}}
		>
			<Image width={30} height={30} src={user.image} alt={'카카오프로필사진'} />
			<span style={{ color: 'white' }}>{user.nickname}</span>
		</div>
	);
}

export default Profile;
