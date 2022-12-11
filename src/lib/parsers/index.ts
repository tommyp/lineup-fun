import raParser from './raParser';

export default {
	parse: (url: string, body: string) => {
		if (url.includes('ra.co')) {
			return raParser(body);
		}
	}
};
