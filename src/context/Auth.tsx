import customAxios from '@pages/api';
import { createContext, useEffect, useState } from 'react';

export interface User {
	accessToken: string;
	image: string;
	nickname: string;
}

interface IAuthService {
	login(code: string): Promise<User>;
	logout(): Promise<void>;
	getCurrentUserFromServer(): Promise<void>;
	getCurrentUser(): User | null;
}

export const AuthContext = createContext<IAuthService | null>(null);

export class BasicAuthService implements IAuthService {
	private currentUser: User | null = null;

	async login(code: string): Promise<User> {
		const userData = (await customAxios.get(
			`/kakao/redirect?code=${code}`,
		)) as User;

		localStorage.setItem('__token', userData.accessToken);
		this.currentUser = userData;

		return this.currentUser;
	}

	async logout(): Promise<void> {
		this.currentUser = null;
	}

	async getCurrentUserFromServer(): Promise<void> {
		const userData = (await customAxios.get('/kakao/user')) as User;
		this.currentUser = userData;
	}

	getCurrentUser(): User | null {
		return this.currentUser;
	}
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [authServiceState, setAuthServiceState] = useState<IAuthService | null>(
		null,
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const authService = new BasicAuthService();
		const hasToken = localStorage.getItem('__token');
		if (!hasToken) {
			setLoading(false);
			setAuthServiceState(authService);
			return;
		}
		authService.getCurrentUserFromServer().then(() => {
			setLoading(false);
			setAuthServiceState(authService);
		});
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!authServiceState) {
		throw new Error('AuthProvider를 찾을 수 없습니다.');
	}

	return (
		<AuthContext.Provider value={authServiceState}>
			{children}
		</AuthContext.Provider>
	);
};
