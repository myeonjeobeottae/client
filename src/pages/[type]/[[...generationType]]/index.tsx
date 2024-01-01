import { useRouter } from 'next/router';
import CustomFunnelTemp from '@templates/generationTemp/CustomFunnelTemp';
import UrlTemp from '@templates/generationTemp/UrlTemp';

function GenerationPage() {
	const router = useRouter();
	const generationType = router.query['generationType'];
	return (
		<>{generationType === 'custom' ? <CustomFunnelTemp /> : <UrlTemp />}</>
	);
}

export default GenerationPage;
