<script>
	import { browser } from '$app/env';

	import spotify, { spotifyUser } from '$lib/utils/spotify';
	import chunk from 'chunk';
	import Button from './Button.svelte';
	import Footer from './Footer.svelte';
	import NoResult from './NoResult.svelte';

	import Result from './Result.svelte';

	export let results;
	export let playlistName;
	export let noResultsArtists;
	let url = '';

	if (browser) {
		const storedPlaylistName = window.localStorage.getItem('playlistName');
		if (storedPlaylistName) {
			playlistName = storedPlaylistName;
		}
	}

	$: artistIds = results.filter((a) => a).map((a) => a.id);

	$: title = `${playlistName} | Lineupper - a Spotify playlist generator`;

	const generate = async () => {
		const artistTracks = await Promise.allSettled(
			artistIds.map((id) => spotify.getArtistTopTracks(id, 'GB'))
		).then((promises) => {
			return promises.map((promise) => {
				console.log(promise);
				if (promise.status === 'fulfilled') {
					return promise.value.tracks;
				}
			});
		});

		const user = spotifyUser();

		const playlist = await spotify
			.createPlaylist(user.id, {
				name: playlistName
			})
			.then((resp) => resp);

		const chunked_tracks = chunk(artistTracks.flat(), 100);

		await Promise.allSettled(
			chunked_tracks.map((chunk) => {
				return spotify.addTracksToPlaylist(
					playlist.id,
					chunk.map((track) => track.uri)
				);
			})
		);

		url = playlist.external_urls.spotify;
	};

	const removeResult = (result) => {
		results = results.filter((r) => r !== result);
	};

	const startAgain = () => {
		results = [];
		noResultsArtists = [];
	};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container">
	<div class="results">
		<h1>{playlistName}</h1>

		{#each results as result}
			<Result {result} {removeResult} />
		{/each}

		{#if noResultsArtists.length > 0}
			<h3>not found</h3>
		{/if}
		{#each noResultsArtists as artist}
			<NoResult {artist} />
		{/each}
	</div>
	<div class="buttons">
		{#if url}
			<Button big={true} handleClick={() => (window.location.href = url)}>{playlistName}</Button>
		{:else}
			<Button disabled={results.length == 0} big={true} handleClick={generate}>generate</Button>
		{/if}
		<Button big={true} handleClick={startAgain}>start again</Button>
		<Footer />
	</div>
</div>

<style>
	.container {
		grid-template-columns: 1fr;
		grid-template-rows: 100% 1fr;

		height: 100vh;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	h1 {
		margin-top: 5rem;
		font-size: 8rem;
	}

	.results {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
		height: auto;
		padding-bottom: 2rem;
		flex-grow: 1;
		overflow-y: scroll;
	}

	.buttons {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		gap: 2rem;

		width: 100%;
		padding-bottom: 1rem;
	}

	h3 {
		color: #aaa;
	}

	@media (min-width: 1024px) {
		.container {
			display: grid;
			grid-template-columns: 3fr 1fr;
			grid-template-rows: 1fr;
			gap: 6rem;
			max-height: 100vh;
			height: 100vh;
		}

		.results {
			height: 100vh;
		}

		.buttons {
			padding-top: 6rem;

			justify-content: space-between;
		}
	}
</style>
