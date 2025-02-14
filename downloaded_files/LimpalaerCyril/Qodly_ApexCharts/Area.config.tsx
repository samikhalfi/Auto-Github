import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartArea } from 'react-icons/fa';

import AreaSettings, { BasicSettings } from './Area.settings';

export default {
	craft: {
		displayName: 'Area',
		kind: EComponentKind.BASIC,
		props: {
			name: '',
			classNames: [],
			events: [],
		},
		related: {
			settings: Settings(AreaSettings, BasicSettings),
		},
	},
	info: {
		displayName: 'Area',
		exposed: true,
		icon: FaChartArea,
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
		name: 'Qodly Area Chart name',
		legendPosition: 'top',
		titlePosition: 'center',
		exportable: true,
		zoomable: true,
		displayLabels: true,
		strokeCurve: 'straight',
		xAxisTickAmount: 12,
		yAxisTickAmount: 8,
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<IAreaProps>;

export interface IAreaProps extends webforms.ComponentProps {
	name?: string;
	annotations?: IAnnotation[];
	chartColors?: IColor[];
	exportable?: boolean;
	zoomable?: boolean;
	displayLabels?: boolean;
	strokeCurve?: 'straight' | 'smooth' | 'monotoneCubic' | 'stepline';
	legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'hidden';
	titlePosition?: 'center' | 'left' | 'right';
	xAxisTitle?: string;
	yAxisTitle?: string;
	yAxisTickAmount?: number;
	xAxisTickAmount?: number;
	yAxisMin?: number;
	yAxisMax?: number;
}

export interface IColor {
	color: string;
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
