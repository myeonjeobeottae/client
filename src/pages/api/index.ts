import Axios, { AxiosError, AxiosInstance, isAxiosError } from 'axios';
import { User } from 'context/Auth';

interface aa extends AxiosError {
	message: string;
}

type b = { message: string };
export const createApi = (): AxiosInstance => {
	const customAxios = Axios.create({
		baseURL: 'https://interviewee.store',
		withCredentials: true,
	});

	customAxios.interceptors.response.use(
		(response) => {
			console.log(response.data);
			return Promise.resolve(response.data);
		},

		async (error: AxiosError<b>) => {
			console.log(error.response);
			//refreshAccessToken  && 메시ㅣ지 같이 체크
			if (isAxiosError(error)) {
				if (error && error.response?.status === 403) {
					if (error.response.data.message == '토큰이 만료되었습니다.') {
						{
							const userData: User =
								await customAxios.get('/kakao/renew/token');
							localStorage.setItem('__token', userData?.accessToken);
							return;
						}
					} else if ('refresh token이 없습니다.') {
						localStorage.removeItem('__token');
						window.location.href = '/login';
						alert('토큰없음');
					}
				}
			}

			return Promise.reject(error);
		},
	);

	customAxios.interceptors.request.use((config) => {
		const token = localStorage.getItem('__token');

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	});

	return customAxios;
};

const customAxios = createApi();

export default customAxios;
