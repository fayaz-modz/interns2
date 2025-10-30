<script lang="ts">
	import Button from '../components/Button.svelte';

	let loading = $state(false);
	let data = $state('no data');

	interface User {
		addr: string;
	}

	async function getUserData() {
		loading = true;
		const res = await fetch('/api/data', {
			method: 'POST',
			body: JSON.stringify({
				user: 1
			})
		});

		data = await res.json();
		loading = false;
	}

	let value = $state('');

	function runMe() {
		const user: User = {
			addr: 'myaddr'
		};
	}
</script>

<p>we will edit here</p>
<Button></Button>

<button onclick={getUserData}>make post requset</button>

<input type="text" bind:value />

<button onclick={runMe}>run me</button>

{#if loading}
	<h1>request is loading</h1>
{:else}
	<h1>{JSON.stringify(data)}</h1>
{/if}
