import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { RiFireFill } from 'react-icons/ri';

import HeatmapSettings, { BasicSettings } from './Heatmap.settings';

export default {
	craft: {
		displayName: 'Heatmap',
		kind: EComponentKind.BASIC,
		props: {
			name: '',
			classNames: [],
			events: [],
		},
		related: {
			settings: Settings(HeatmapSettings, BasicSettings),
		},
	},
	info: {
		displayName: 'Heatmap',
		exposed: true,
		icon: RiFireFill,
		events: [
			{
				label: 'On Click',
				value: 'onclick',
			},
			{
				label: 'On Blur',
				value: 'onblur',
			},
			{
				label: 'On Focus',
				value: 'onfocus',
			},
			{
				label: 'On MouseEnter',
				value: 'onmouseenter',
			},
			{
				label: 'On MouseLeave',
				value: 'onmouseleave',
			},
			{
				label: 'On KeyDown',
				value: 'onkeydown',
			},
			{
				label: 'On KeyUp',
				value: 'onkeyup',
			},
		],
		datasources: {
			accept: ['string', 'object'],
		},
	},
	defaultProps: {
		name: 'Qodly Heatmap Chart name',
		legendPosition: 'top',
		titlePosition: 'center',
		exportable: true,
		zoomable: true,
		displayLabels: false,
		strokeCurve: 'straight',
		colorFlipper: false,
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<IHeatmapProps>;

export interface IHeatmapProps extends webforms.ComponentProps {
	name?: string;
	chartColors: IColor[];
	exportable?: boolean;
	displayLabels?: boolean;
	titlePosition?: 'center' | 'left' | 'right';
	xAxisTitle?: string;
	yAxisTitle?: string;
	colorFlipper?: boolean;
	colorRanges?: IColorRange[];
}

export interface IColor {
	color: string;
}

export interface IColorRange extends IColor {
	from: number;
	to: number;
}

export interface IAnnotation {
	text: string;
	axis: 'x' | 'y' | 'point';
	coordType: 'string' | 'number' | 'datetime';
	coordFrom: string;
	coordTo: string;
	backgroundColor: string;
	borderColor: string;
}
