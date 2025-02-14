import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdDonutLarge } from 'react-icons/md';

import DonutSettings, { BasicSettings } from './Donut.settings';

export default {
	craft: {
		displayName: 'Donut',
		kind: EComponentKind.BASIC,
		props: {
			name: '',
			classNames: [],
			events: [],
		},
		related: {
			settings: Settings(DonutSettings, BasicSettings),
		},
	},
	info: {
		displayName: 'Donut',
		exposed: true,
		icon: MdDonutLarge,
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
		name: 'Qodly Donut Chart name',
		legendPosition: 'top',
		titlePosition: 'center',
		gradient: false,
		displayLabels: true,
		style: {
			width: '500px',
		},
	},
} as T4DComponentConfig<IDonutProps>;

export interface IDonutProps extends webforms.ComponentProps {
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
