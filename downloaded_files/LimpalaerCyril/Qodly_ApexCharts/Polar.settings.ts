import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';
import {
	CgAlignBottom,
	CgAlignLeft,
	CgAlignRight,
	CgAlignTop,
	CgAlignCenter,
	CgShortcut,
} from 'react-icons/cg';

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
		key: 'legendPosition',
		label: 'Legend Position',
		type: ESetting.RADIOGROUP,
		defaultValue: 'top',
		options: [
			{ value: 'top', icon: CgAlignTop },
			{ value: 'bottom', icon: CgAlignBottom },
			{ value: 'left', icon: CgAlignLeft },
			{ value: 'right', icon: CgAlignRight },
			{ value: 'hidden', icon: CgShortcut },
		],
	},
	{
		key: 'yAxisTickAmount',
		label: 'Y Axis tick amount',
		type: ESetting.NUMBER_FIELD,
	},
	{
		key: 'yAxisMax',
		label: 'Y Axis max value',
		type: ESetting.NUMBER_FIELD,
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
