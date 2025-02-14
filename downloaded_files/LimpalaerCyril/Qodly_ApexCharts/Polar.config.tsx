import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { PiChartPolar } from 'react-icons/pi';

import AreaSettings, { BasicSettings } from './Polar.settings';

export default {
	craft: {
		displayName: 'Polar',
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
		displayName: 'Polar',
		exposed: true,
		icon: PiChartPolar,
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
		displayLabels: true,
		yAxisTickAmount: 8,
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<IPolarProps>;

export interface IPolarProps extends webforms.ComponentProps {
	name?: string;
	chartColors?: IColor[];
	displayLabels?: boolean;
	legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'hidden';
	titlePosition?: 'center' | 'left' | 'right';
	yAxisTickAmount?: number;
	yAxisMax?: number;
}

export interface IColor {
	color: string;
}
