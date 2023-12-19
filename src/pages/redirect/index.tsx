import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface UserData {
	accessToken: string;
	refreshToken: string;
	userNickname: string;
	userImage: string;
}

export default function Redirect({ code }: { code: string }) {
	const router = useRouter();
	useEffect(() => {
		const onLogin = async () => {
			try {
				const data = await axios.get(
					`https://interviewee.store/kakao/redirect?code=${code}`,
					{
						withCredentials: true,
					},
				);
				console.log('🚀 ~ file: index.tsx:24 ~ onLogin ~ data:', data);
				// const { accessToken, refreshToken, userImage, userNickname } = data;
				// console.log(
				// 	'🚀 ~ file: index.tsx:25 ~ onLogin ~ accessToken, refreshToken, userImage, userNickname:',
				// 	accessToken,
				// 	refreshToken,
				// 	userImage,
				// 	userNickname,
				// );

				router.push('/');
			} catch (error) {}
		};
		onLogin();
	}, []);

	return <div>로그인 리다이렉트</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	if (context.query && context.query.code) {
		const { code } = context.query;

		return {
			props: {
				code,
			},
		};
	}
	return {
		props: {
			code: '',
		},
	};
};
