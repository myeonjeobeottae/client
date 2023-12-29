import Axios, { AxiosInstance } from 'axios';

export const createApi = (): AxiosInstance => {
	const customAxios = Axios.create({
		baseURL: 'https://interviewee.store',
		withCredentials: true,
	});

	return customAxios;
};

const customAxios = createApi();

export default customAxios;
