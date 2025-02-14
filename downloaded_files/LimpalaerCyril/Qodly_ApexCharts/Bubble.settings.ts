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
		key: 'yAxisTickAmount',
		label: 'Y Axis tick amount',
		type: ESetting.NUMBER_FIELD,
	},
	{
		key: 'xAxisTickAmount',
		label: 'X Axis tick amount',
		type: ESetting.NUMBER_FIELD,
	},
	{
		key: 'yAxisMin',
		label: 'Y Axis min value',
		type: ESetting.NUMBER_FIELD,
	},
	{
		key: 'yAxisMax',
		label: 'Y Axis max value',
		type: ESetting.NUMBER_FIELD,
	},
	{
		key: 'exportable',
		label: 'Exportable',
		type: ESetting.CHECKBOX,
	},
	{
		key: 'zoomable',
		label: 'Zommable',
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
		type: ESetting.DATAGRID,
		key: 'annotations',
		name: 'text',
		label: 'Annotations',
		data: [
			{
				key: 'text',
				label: 'Text',
				type: ESetting.TEXT_FIELD,
				defaultValue: 'Annotation',
			},
			{
				key: 'axis',
				label: 'Axis',
				type: ESetting.SELECT,
				defaultValue: 'x',
				options: [
					{ value: 'x', label: 'X' },
					{ value: 'y', label: 'Y' },
					{ value: 'point', label: 'Point' },
				],
			},
			{
				key: 'coordType',
				label: 'Coordinate Type',
				type: ESetting.SELECT,
				defaultValue: 'string',
				options: [
					{ value: 'string', label: 'String' },
					{ value: 'number', label: 'Number' },
					{ value: 'datetime', label: 'Datetime' },
				],
			},
			{
				key: 'coordFrom',
				label: 'From (X for point)',
				placeholder: '2021-01-01',
				type: ESetting.TEXT_FIELD,
			},
			{
				key: 'coordTo',
				label: 'To (Y for point)',
				placeholder: '2021-12-31',
				type: ESetting.TEXT_FIELD,
			},
			{
				key: 'backgroundColor',
				label: 'Background Color',
				type: ESetting.COLOR_PICKER,
			},
			{
				key: 'borderColor',
				label: 'Border Color',
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
