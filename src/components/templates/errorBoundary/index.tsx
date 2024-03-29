import Button from '@atoms/button';
import { AxiosError, isAxiosError } from 'axios';
import React, { Component } from 'react';

type ErrorBoundaryProps = {
	children?: React.ReactNode;
};
type ErrorBoundaryState = {
	shouldHandleError: boolean;
	shouldRethrow: boolean;
	error: Error | null;
};

export class ApiErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state = {
		shouldHandleError: false,
		shouldRethrow: false,
		error: null,
	};

	static getDerivedStateFromError(error: Error) {
		console.log('api error:', error);
		if (error.message === '여기서 처리 못하는 Error') {
			return {
				shouldHandleError: false,
				shouldRethrow: true,
				error,
			};
		}
		return {
			shouldHandleError: true,
			shouldRethrow: false,
			error,
		};
	}
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		this.errorLogging(error, errorInfo);
	}

	errorLogging(error: Error, errorInfo: React.ErrorInfo) {
		console.log(`error: ${error}, info: ${JSON.stringify(errorInfo)}`);
	}

	render() {
		if (this.state.shouldRethrow) {
			throw this.state.error;
		}

		if (!this.state.shouldHandleError) {
			return this.props.children;
		}
		console.log(isAxiosError(this.state.error));
		if (isAxiosError(this.state.error)) {
			const axiosError = (this.state.error as AxiosError).response?.status;
			console.log(axiosError);

			if (axiosError === 400) {
				console.log('refreshAccessToken');

				return (
					<div
						style={{
							color: 'limegreen',
							position: 'absolute',
							top: '50%',
							left: '50%',
						}}
					>
						알려지지않은 에러
						<button onClick={() => (window.location.href = '/')}>
							메인으로가기
						</button>
						<button onClick={() => this.setState({ shouldHandleError: false })}>
							다시 시도
						</button>
					</div>
				);
			}
		} else {
			const error = this.state.error;
			const errorCode = error && error['cause']['code'];
			if (errorCode === 401) {
				console.log(errorCode);
				return <div style={{ color: 'white' }}>네트워크에러</div>;
			}
			if (errorCode === 600) {
				console.log(errorCode);

				return (
					<div
						style={{
							color: 'limegreen',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate3d(-50%,-50%,0)',
						}}
					>
						비정상적인 접근입니다.
						<Button
							style={{ color: 'white' }}
							onClick={() => (window.location.href = '/')}
						>
							메인으로 가기
						</Button>
					</div>
				);
			}
		}

		return (
			<div
				style={{
					color: 'limegreen',
					position: 'absolute',
					top: '50%',
					left: '50%',
				}}
			>
				알려지지않은 에러
				<button onClick={() => (window.location.href = '/')}>
					메인으로가기
				</button>
				<button onClick={() => this.setState({ shouldHandleError: false })}>
					다시 시도
				</button>
			</div>
		);
	}
}

export class GlobalErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state = {
		shouldHandleError: false,
		shouldRethrow: false,
		error: null,
	};

	static getDerivedStateFromError(error: Error) {
		console.log('error', error);
		if (error.message === '여기서 처리 못하는 Error') {
			return {
				shouldHandleError: false,
				shouldRethrow: true,
				error,
			};
		}
		return {
			shouldHandleError: true,
			shouldRethrow: false,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		this.errorLogging(error, errorInfo);
	}
	errorLogging(error: Error, errorInfo: React.ErrorInfo) {
		console.log(`error: ${error}, info: ${JSON.stringify(errorInfo)}`);
	}
	render() {
		const error = this.state.error;
		const errorCode = error && error['response']['status'];

		if (errorCode === 401) {
			return (
				<div style={{ color: 'red', fontSize: '5rem' }}>
					400에러 !@@!@#!@!#@!#@!
				</div>
			);
		}
		if (!this.state.shouldHandleError) {
			return this.props.children;
		}
		if (error === '비로그인') {
			return <div>네트워크에러</div>;
		}
		if (error === 'wefweaaa') {
			console.log('hewwhehew');
			return <div>서버점검에러</div>;
		}
		return (
			<div
				style={{ color: 'limegreen', width: '400px', height: '400px' }}
				onClick={() => this.setState({ shouldHandleError: false })}
			>
				알려지지않은eee 에러
			</div>
		);
	}
}
