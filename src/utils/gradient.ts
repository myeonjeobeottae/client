export function gradient(deg: number = 0, fromColor: string, toColor: string) {
	const [fColor, fAlpha] = fromColor.split(' ');
	const [tColor, tAlpha] = toColor.split(' ');

	return `linear-gradient(${deg}deg, ${fColor} ${fAlpha ?? 100}%, ${tColor} ${
		tAlpha ?? 100
	}%)`;
}

/**
 * //TODO: toGeneric
	const cbGradient = useCallback(
		(fromColor: string, toColor: string, deg?: number | undefined) => {
			return gradient(deg, fromColor, toColor);
		},
		[options.view],
	);
 */
