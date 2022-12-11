<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import Label from '$lib/components/Label.svelte';

	const handleSubmit = () => {
		fetch(url, {})
			.then((res) => res.body)
			.then((data) => {
				console.log(data);
			});
	};

	let url = '';
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Label htmlFor="url">URL</Label>
	<TextInput name="url" placeholder="https://example.com" required value={url} />
	.
</form>

<style>
</style>
