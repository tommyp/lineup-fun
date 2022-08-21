import QueryString from 'qs';

export async function GET({ url }) {
	const code = url.searchParams.get('code');

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization:
				'Basic ' +
				Buffer.from(
					import.meta.env.VITE_SPOTIFY_CLIENT_ID + ':' + import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
				).toString('base64')
		},
		body: QueryString.stringify({
			code: code,
			redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
			grant_type: 'authorization_code'
		})
	});

	const body = await res.json();

	if (body.access_token) {
		return {
			status: 301,
			headers: {
				location: `/lineup?accessToken=${body.access_token}`
			}
		};
	} else {
		return {
			status: 500,
			body
		};
	}
}
