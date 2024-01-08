import { AuthContext } from 'context/Auth';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export default function Redirect({ code }: { code: string }) {
	const router = useRouter();
	const authService = useContext(AuthContext);

	useEffect(() => {
		const onLogin = async () => {
			try {
				await authService?.login(code);
				router.replace('/');
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
