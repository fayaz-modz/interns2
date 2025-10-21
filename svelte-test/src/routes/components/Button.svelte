<script lang="ts">
	import { show, inc } from '$lib/counter.svelte';
</script>

<button onclick={inc}>Press me (pressed {show()} time)</button>
