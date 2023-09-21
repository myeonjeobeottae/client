import React, { useState } from 'react';

export default function useInput({ initValue, ...props }: useInputType) {
	const [value, setValue] = useState(initValue || '');
	let input = (
		<input
			value={value}
			onChange={(e) => setValue(e.target.value)}
			{...props}
		/>
	);
	return [value, input, setValue];
}

interface useInputType extends React.InputHTMLAttributes<HTMLInputElement> {
	initValue?: any;
}

export const useTextInput = (options: Parameters<typeof useInput>[0]) =>
	useInput({ type: 'text', ...options });
