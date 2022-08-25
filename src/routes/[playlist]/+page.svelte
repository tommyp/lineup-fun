<script>
	import { browser } from '$app/env';
	import Button from '$lib/components/Button.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { getCookie, setCookie } from '$lib/utils/cookies';
	import spotify, { saveSpotifyUser, spotifyUser } from '$lib/utils/spotify';
	import { searchResults, notFoundSearchResults, playlistNameStore } from '$lib/stores';
	import NoResult from '$lib/components/NoResult.svelte';
	import Result from '$lib/components/Result.svelte';
	import { goto } from '$app/navigation';
	import chunk from 'chunk';

	let playlistName = $playlistNameStore;
	let artists;
	let results = [];
	let noResultsArtists = [];
	let url;

	$: browser && window.localStorage.setItem('results', JSON.stringify(results));

	$: artistIds = $searchResults.filter((a) => a).map((a) => a.id);

	$: title = `${playlistName} | Lineup.fun - a Spotify playlist generator`;

	$: console.log($searchResults);
	// $: if (!document.referrer.includes('/search')) {
	// 	goto('/');
	// }
	$: console.log(document.referrer);

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
		$searchResults.update((results) => results.filter((r) => r !== result));
	};

	const startAgain = () => {
		searchResults.set([]);
		notFoundSearchResults.set([]);
		goto('/search');
	};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container">
	<div class="results">
		<h1>{playlistName}</h1>

		{#each $searchResults as result}
			<Result {result} {removeResult} />
		{/each}

		{#if $notFoundSearchResults.length > 0}
			<h3>not found</h3>
		{/if}
		{#each $notFoundSearchResults as artist}
			<NoResult {artist} />
		{/each}
	</div>
	<div class="buttons">
		{#if url}
			<Button big={true} handleClick={() => (window.location.href = url)}>{playlistName}</Button>
		{:else}
			<Button disabled={$searchResults.length == 0} big={true} handleClick={generate}
				>generate</Button
			>
		{/if}
		<Button big={true} handleClick={startAgain}>reset</Button>
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
		gap: 2.5rem;
		height: auto;
		padding-bottom: 2rem;
		flex-grow: 1;
		overflow-y: scroll;
	}

	.buttons {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;

		gap: 2rem;

		width: 100%;
		padding-top: 1rem;
		padding-bottom: 5rem;
		max-width: 100%;
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

			flex-direction: column;
		}
	}
</style>
