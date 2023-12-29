import customAxios from '@pages/api';
import { AuthContext } from 'context/Auth';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

interface User {
	image: string;
	nickname: string;
}

interface CustomAxiosResponse<T> {
	data: T;
	status: number;
}

export default function Redirect({ code }: { code: string }) {
	const router = useRouter();
	const authService = useContext(AuthContext);

	useEffect(() => {
		const onLogin = async () => {
			try {
				// authService?.login(code);
				const res = await customAxios.get<CustomAxiosResponse<User>>(
					`/kakao/redirect?code=${code}`,
				);
				console.log('🚀 ~ file: index.tsx:26 ~ onLogin ~ res:', res);
				router.push('/');
			} catch (error) {
				console.log(error);
			}
		};
		onLogin();
	}, []);

	return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		if (!context.query) {
			throw new Error(`query 없음`);
		}
		const { code } = context.query;
		// const res = await customAxios.get(`/kakao/redirect?code=${code}`);
		return {
			props: {
				code,
			},
		};
	} catch (error) {
		return {
			props: {},
		};
	}
};
