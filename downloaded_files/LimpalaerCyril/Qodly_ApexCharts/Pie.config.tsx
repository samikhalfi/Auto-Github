import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaChartPie } from 'react-icons/fa';

import PieSettings, { BasicSettings } from './Pie.settings';

export default {
	craft: {
		displayName: 'Pie',
		kind: EComponentKind.BASIC,
		props: {
			name: '',
			classNames: [],
			events: [],
		},
		related: {
			settings: Settings(PieSettings, BasicSettings),
		},
	},
	info: {
		displayName: 'Pie',
		exposed: true,
		icon: FaChartPie,
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
		name: 'Qodly Pie Chart name',
		legendPosition: 'top',
		titlePosition: 'center',
		gradient: false,
		displayLabels: true,
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<IPieProps>;

export interface IPieProps extends webforms.ComponentProps {
	name?: string;
	chartColors?: IColor[];
	gradient?: boolean;
	displayLabels?: boolean;
	legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'hidden';
	titlePosition?: 'center' | 'left' | 'right';
}

export interface IColor {
	color: string;
}
