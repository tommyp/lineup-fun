import { json as json$1 } from '@sveltejs/kit';
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
		return new Response(undefined, {
			status: 301,
			headers: {
				location: `/lineup?accessToken=${body.access_token}`
			}
		});
	} else {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
		// Suggestion (check for correctness before using):
		// return json$1(body, {
		// 	status: 500
		// });
		return {
			status: 500,
			body
		};
	}
}
