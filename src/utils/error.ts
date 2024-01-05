type ErrorName =
	| 'RouterUndefinedError'
	| 'BadRequestError'
	| 'UnauthorizedError'
	| 'ForbiddenError'
	| 'unknwon';

interface StatusCode {
	request: 400;
	auth: 401 | 403;
	router: 600 | 601;
	server: 500;
}
type RouterErrorCode = StatusCode['router'] | StatusCode['request'];
type AuthErrorCode = StatusCode['auth'];

interface ErrorType extends Error {
	name: ErrorName;
	cause: { code: number };
}

/**
 * @param {string} message 에러메세지
 * @param {400 | 600} code 에러코드
 */
export function routerError(message: string, code: RouterErrorCode) {
	const error = new Error(message) as ErrorType;
	error.name =
		code === 400
			? 'BadRequestError'
			: code === 600
			? 'RouterUndefinedError'
			: 'unknwon';
	error.cause = { code };
	throw error;
}

// /**
//  * @param {string} message 에러메세지
//  * @param {401 | 403} code 에러코드
//  */
export function authError(message: string, code: AuthErrorCode) {
	const error = new Error(message) as ErrorType;
	error.name =
		code === 401
			? 'UnauthorizedError'
			: code === 403
			? 'ForbiddenError'
			: 'unknwon';
	error.cause = { code };
	throw error;
}
