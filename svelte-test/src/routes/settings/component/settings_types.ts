export type SettingsItemType = {
	name: string;
	type: 'input' | 'toggle' | 'select' | 'number';
	value: string | boolean | number;
};
