<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const url = page.url;
</script>

{#if url.pathname == '/canvas'}
	{@render children?.()}
{:else}
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/edit">Edit</a>
		<a href="/grid">Grid</a>
	</nav>

	<main>
		{@render children?.()}
	</main>

	<footer>this is the footer</footer>
{/if}

<style>
	main {
		min-height: 90vh;
	}
	nav {
		width: 100%;
		padding: 10px;
		background: black;
		color: white;
	}

	nav a {
		color: white;
	}

	:global {
		* {
			margin: 0;
		}
	}

	footer {
		background: blue;
		color: white;
		width: 100%;
	}
</style>
