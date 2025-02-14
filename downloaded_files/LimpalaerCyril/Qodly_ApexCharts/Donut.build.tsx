import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IDonutProps } from './Donut.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Donut: FC<IDonutProps> = ({
	displayLabels,
	chartColors,
	gradient,
	titlePosition,
	legendPosition,
	name,
	style,
	className,
	classNames = [],
}) => {
	const {
		connectors: { connect },
	} = useEnhancedNode();

	const gradientType = gradient ? 'gradient' : 'solid';
	const showLegend = legendPosition !== 'hidden';
	const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend ? legendPosition! : 'top';
	let initialColors = [
		'#FF4560',
		'#008FFB',
		'#00E396',
		'#FEB019',
		'#FF5828',
		'#9E9E9E',
		'#36B37E',
		'#607D8B',
		'#4BC0C0',
		'#E91E63',
		'#9C27B0',
		'#673AB7',
		'#3F51B5',
		'#2196F3',
		'#03A9F4',
		'#00BCD4',
		'#009688',
		'#4CAF50',
		'#8BC34A',
		'#CDDC39',
		'#FFEB3B',
		'#FFC107',
		'#FF9800',
		'#FF5722',
		'#795548',
	];
	const chartColorsArr = chartColors?.map((color) => color.color) ?? initialColors;
	const options: ApexOptions = useMemo(
		() => ({
			chart: {
				type: 'donut',
			},
			colors: chartColorsArr,
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: 'bottom',
						},
					},
				},
			],
			dataLabels: {
				enabled: displayLabels,
			},
			labels: [
				'Comedy',
				'Action',
				'SciFi',
				'Drama',
				'Horror',
				'Romance',
				'Thriller',
				'Mystery',
				'Documentary',
			],
			fill: {
				type: gradientType,
			},
			legend: {
				show: showLegend,
				position: legendPos,
			},
			title: {
				text: name,
				align: titlePosition,
			},
		}),
		[legendPos, name, showLegend, titlePosition, gradientType, displayLabels, chartColors],
	);

	const series = useMemo(
		// Prevents unnecessary re-renders if no editor changes
		() => Array.from({ length: 9 }, () => Math.floor(Math.random() * 150)),
		[],
	);

	const chart = {
		series: series,
		options: options,
	};

	return (
		<div ref={connect} style={style} className={cn(className, classNames)}>
			<ReactApexChart
				options={chart.options}
				series={chart.series}
				type={chart.options.chart?.type}
			/>
		</div>
	);
};

export default Donut;
