import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineCandlestickChart } from 'react-icons/md';

import CandlestickSettings, { BasicSettings } from './Candlestick.settings';

export default {
	craft: {
		displayName: 'Candlestick',
		kind: EComponentKind.BASIC,
		props: {
			name: '',
			classNames: [],
			events: [],
		},
		related: {
			settings: Settings(CandlestickSettings, BasicSettings),
		},
	},
	info: {
		displayName: 'Candlestick',
		exposed: true,
		icon: MdOutlineCandlestickChart,
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
		name: 'Qodly Candlestick Chart name',
		titlePosition: 'center',
		exportable: true,
		zoomable: true,
		displayLabels: false,
		xAxisTickAmount: 12,
		yAxisTickAmount: 8,
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<ICandlestickProps>;

export interface ICandlestickProps extends webforms.ComponentProps {
	name?: string;
	annotations?: IAnnotation[];
	chartColors?: IColor[];
	exportable?: boolean;
	zoomable?: boolean;
	displayLabels?: boolean;
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
