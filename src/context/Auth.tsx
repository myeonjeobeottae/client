import customAxios from '@pages/api';
import { createContext } from 'react';

interface User {
	image: string;
	nickname: string;
}

interface CustomAxiosResponse<T> {
	data: T;
	status: number;
}

interface IAuthService {
	login(code: string): Promise<User>;
	logout(): Promise<void>;
	getCurrentUser(): User | null;
}

export const AuthContext = createContext<IAuthService | null>(null);

export class BasicAuthService implements IAuthService {
	private currentUser: User | null = null;

	async login(code: string): Promise<User> {
		const res = await customAxios.get<CustomAxiosResponse<User>>(
			`/kakao/redirect?code=${code}`,
		);
		console.log(
			'🚀 ~ file: Auth.tsx:29 ~ BasicAuthService ~ login ~ response:',
			res.data,
		);
		this.currentUser = res.data.data;
		return this.currentUser;
	}

	async logout(): Promise<void> {
		this.currentUser = null;
	}

	getCurrentUser(): User | null {
		return this.currentUser;
	}
}
export const AuthProvider = ({
	authService,
	children,
}: {
	authService: any;
	children: React.ReactNode;
}) => {
	return (
		<AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
	);
};
