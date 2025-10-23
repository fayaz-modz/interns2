<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/edit">Edit</a>
</nav>

<main>
	{@render children?.()}
</main>

<footer>this is the footer</footer>

<style>
	main {
		min-height: 100vh;
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
