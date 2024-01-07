import Axios, { AxiosError, AxiosInstance } from 'axios';
import { User } from 'context/Auth';

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

		async (error: AxiosError) => {
			console.log(error.response);
			//refreshAccessToken
			if (error.response?.status === 403) {
				const userData = (await customAxios.get('/kakao/renew/token')) as User;
				localStorage.setItem('__token', userData?.accessToken);
				return;
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
