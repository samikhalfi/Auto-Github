import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartLine } from "react-icons/fa";

import LineSettings, { BasicSettings } from './Line.settings';

export default {
	craft: {
		displayName: 'Line',
		kind: EComponentKind.BASIC,
		props: {
			name: '',
			classNames: [],
			events: [],
		},
		related: {
			settings: Settings(LineSettings, BasicSettings),
		},
	},
	info: {
		displayName: 'Line',
		exposed: true,
		icon: FaChartLine,
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
		name: 'Qodly Line Chart name',
		legendPosition: 'top',
		titlePosition: 'center',
		chartType: 'line',
		exportable: true,
		zoomable: true,
		displayLabels: true,
		strokeCurve: 'straight',
		xAxisTickAmount: 12,
		yAxisTickAmount: 8,
		style: {
			width: '500px',
		}
	},
} as T4DComponentConfig<ILineProps>;

export interface ILineProps extends webforms.ComponentProps {
	name?: string;
	chartType?: 'line' | 'area' | 'bar';
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