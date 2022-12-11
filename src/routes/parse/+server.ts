import parsers from '../../lib/parsers';

export const GET = async (req, res) => {
	const { url } = req.query;
	const body = await fetch(url).then((res) => res.text());
	const parser = parsers.parse(url, body);
};
