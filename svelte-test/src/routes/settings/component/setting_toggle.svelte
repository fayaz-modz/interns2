<script lang="ts">
	interface ToggleSettingProps {
		name: string;
		value: boolean;
	}

	let { name = $bindable(), value = $bindable() }: ToggleSettingProps = $props();
</script>

<div>
	<span>{name}</span>
	<input type="checkbox" bind:checked={value} />
</div>
