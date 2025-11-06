<script lang="ts">
	interface ToggleSettingProps {
		name: string;
		value: string;
	}

	let { name = $bindable(), value = $bindable() }: ToggleSettingProps = $props();
</script>

<div>
	<span>{name}</span>
	<input type="text" bind:value />
</div>
