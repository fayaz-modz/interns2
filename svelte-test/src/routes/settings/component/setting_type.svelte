<script lang="ts">
	import SettingInput from './setting_input.svelte';
	import SettingToggle from './setting_toggle.svelte';

	interface ToggleSettingProps {
		name: string;
		type: string;
		value: boolean | string;
	}

	let {
		name = $bindable(),
		type = $bindable(),
		value = $bindable()
	}: ToggleSettingProps = $props();
</script>

<div style="background: #ccc; padding: 10px; margin: 10px;">
	{#if type == 'toggle'}
		<SettingToggle {name} value={value as boolean}></SettingToggle>
	{:else if type == 'input'}
		<SettingInput {name} value={value as string}></SettingInput>
	{/if}
</div>
