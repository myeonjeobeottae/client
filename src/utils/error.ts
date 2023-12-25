type ErrorName = 'RouterUndefinedError' | 'unknwon';

interface StatusCode {
	auth: 401 | 402 | 403;
	router: 600 | 601;
	server: 500;
}
type RouterErrorCode = StatusCode['router'];

interface RouterErrorType extends Error {
	name: ErrorName;
	cause: { code: any };
}

/**
 * @param {string} message 에러메세지
 * @param {600 | 601} code 에러코드
 */
export function routerError(message: string, code: RouterErrorCode) {
	const error = new Error(message) as RouterErrorType;
	error.name = code === 600 ? 'RouterUndefinedError' : 'unknwon';
	error.cause = { code };
	throw error;
}
