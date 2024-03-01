// import customAxios from '@pages/api';
// import { createContext, useEffect, useState } from 'react';

// export interface User {
// 	accessToken: string;
// 	image: string;
// 	nickname: string;
// }

// interface IAuthService {}

// export const InterviewContext = createContext<IAuthService | null>(null);

// export const InterviewProvider = ({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) => {
// 	const [questions, setQuestions] = useState<IAuthService | null>(null);

// 	return (
// 		<InterviewContext.Provider value={authServiceState}>
// 			{children}
// 		</InterviewContext.Provider>
// 	);
// };
