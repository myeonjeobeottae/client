import React, { Component } from 'react';

//TODO: error code 추상화, error별 컴포넌트 구현
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
		const error = this.state.error;
		//여기서 해결못할 에러일 때
		if (this.state.shouldRethrow) {
			throw this.state.error;
		}
		//에러가 아닐 때
		if (!this.state.shouldHandleError) {
			return this.props.children;
		}
		//에러일 때
		if (error === '비로그인') {
			// {/*<AuthError />*/}
			return <div>AuthError</div>;
		}
		if (error === '네트워크 에러 코드') {
			return <div>네트워크에러</div>;
			// return <div onClickRetry={()=>this.setState({shouldHandleError: false})}>네트워크에러</div>
		}
		if (error && error['cause']['code'] === 401) {
			console.log(error['cause']['code']);
			return <div style={{ color: 'white' }}>네트워크에러</div>;
		}
		// return <div onClickRetry={()=>this.setState({shouldHandleError: false})}>네트워크에러</div>
		return <div style={{ color: 'limegreen' }}>알려지지않은 에러</div>;
		// return <UnknownError onClickRetry={() => this.setState({ shouldHandleError: false})} />
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
		if (!this.state.shouldHandleError) {
			return this.props.children;
		}
		if (error === '비로그인') {
			return <div>네트워크에러</div>;
			// return <div onClickRetry={()=>this.setState({shouldHandleError: false})}>네트워크에러</div>
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
		// return <UnknownError onClickRetry={() => this.setState({ shouldHandleError: false})} />
	}
}
