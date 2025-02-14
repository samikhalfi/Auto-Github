import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';
import { CgAlignLeft, CgAlignRight, CgAlignCenter } from 'react-icons/cg';

const commonSettings: TSetting[] = [
	{
		key: 'name',
		label: 'Title',
		type: ESetting.TEXT_FIELD,
		defaultValue: 'Qodly chart summary',
	},
	{
		key: 'titlePosition',
		label: 'Title Position',
		type: ESetting.RADIOGROUP,
		defaultValue: 'center',
		options: [
			{ value: 'left', icon: CgAlignLeft },
			{ value: 'center', icon: CgAlignCenter },
			{ value: 'right', icon: CgAlignRight },
		],
	},
	{
		key: 'xAxisTitle',
		label: 'X Axis Title',
		type: ESetting.TEXT_FIELD,
	},
	{
		key: 'yAxisTitle',
		label: 'Y Axis Title',
		type: ESetting.TEXT_FIELD,
	},
	{
		key: 'exportable',
		label: 'Exportable',
		type: ESetting.CHECKBOX,
	},
	{
		key: 'displayLabels',
		label: 'Display labels',
		type: ESetting.CHECKBOX,
	},
	{
		type: ESetting.DATAGRID,
		key: 'chartColors',
		name: 'chartColors',
		label: 'Chart colors',
		data: [
			{
				key: 'color',
				label: 'Color',
				type: ESetting.COLOR_PICKER,
			},
		],
	},
	{
		key: 'colorFlipper',
		label: 'Color Flipper',
		type: ESetting.CHECKBOX,
	},
	{
		key: 'colorRanges',
		label: 'Color Ranges',
		type: ESetting.DATAGRID,
		data: [
			{
				key: 'color',
				label: 'Color',
				type: ESetting.COLOR_PICKER,
			},
			{
				key: 'from',
				label: 'From',
				type: ESetting.NUMBER_FIELD,
			},
			{
				key: 'to',
				label: 'To',
				type: ESetting.NUMBER_FIELD,
			},
		],
	},
];

const Settings: TSetting[] = [
	{
		key: 'properties',
		label: 'Properties',
		type: ESetting.GROUP,
		components: commonSettings,
	},
	...load(DEFAULT_SETTINGS).filter(
		'style.overflow',
		'display',
		'style.boxShadow',
		'style.textShadow',
		'style.textAlign',
		'style.textDecorationLine',
		'style.fontStyle',
		'style.textTransform',
	),
];

export const BasicSettings: TSetting[] = [
	...commonSettings,
	...load(BASIC_SETTINGS).filter(
		'style.overflow',
		'display',
		'style.boxShadow',
		'style.textShadow',
		'style.textAlign',
		'style.textDecorationLine',
		'style.fontStyle',
		'style.textTransform',
	),
];

export default Settings;
