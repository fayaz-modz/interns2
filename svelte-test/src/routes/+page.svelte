<script>
	import ShowCount from './components/ShowCount.svelte';

	import Button from './components/Button.svelte';

	function getData() {
		const res = fetch('localhost:5173/api');
	}
</script>

<h2>This is a heading</h2>

<Button></Button>

<ShowCount></ShowCount>
