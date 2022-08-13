<script>
	import { browser } from '$app/env';
	import Results from '$lib/components/Results.svelte';
	import Search from '$lib/components/Search.svelte';
	import { getCookie, setCookie } from '$lib/utils/cookies';
	import spotify, { saveSpotifyUser } from '$lib/utils/spotify';

	let playlistName;
	let artists;
	let results = [];
	let noResultsArtists = [];

	$: console.log({ results });
	$: browser && window.localStorage.setItem('results', JSON.stringify(results));

	if (browser) {
		// results = JSON.parse(window.localStorage.getItem('results')) || [];
		const url = new URL(window.location.href);
		const token = url.searchParams.get('accessToken');
		if (token) {
			setCookie('spotify-access-token', token, 3600);

			url.searchParams.delete('accessToken');
			window.history.pushState({}, '', url);
		}

		const accessToken = getCookie('spotify-access-token');
		if (accessToken) {
			spotify.setAccessToken(accessToken);
			saveSpotifyUser();
		}
	}
</script>

{#if results.length > 0 || noResultsArtists.length > 0}
	<Results bind:results bind:noResultsArtists {playlistName} />
{:else}
	<Search bind:results bind:noResultsArtists {playlistName} />
{/if}
