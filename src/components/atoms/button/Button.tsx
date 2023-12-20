interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

function Button({ children, ...props }: PropTypes) {
	return (
		<button className="btn" {...props}>
			{children}
		</button>
	);
}

export default Button;
