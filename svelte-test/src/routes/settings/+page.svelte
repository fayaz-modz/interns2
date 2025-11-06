<script lang="ts">
	import SettingType from './component/setting_type.svelte';
	import type { SettingsItemType } from './component/settings_types';

	let settingsList: SettingsItemType[] = [
		{
			name: 'enable dark mode',
			type: 'toggle',
			value: 'true'
		},
		{
			name: 'enable notifications',
			type: 'toggle',
			value: true
		},
		{
			name: 'workspace name',
			type: 'input',
			value: 'my workspace'
		},
		{
			name: 'theme',
			type: 'input',
			value: 'dark'
		}
	];
</script>

<h1>Settings</h1>

<div style="background: red; padding: 10px;">
	{#each settingsList as setting}
		<SettingType {...setting}></SettingType>
	{/each}
</div>
