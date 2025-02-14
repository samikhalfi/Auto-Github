import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IBubbleProps } from './Bubble.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Bubble: FC<IBubbleProps> = ({
	displayLabels,
	annotations,
	chartColors,
	xAxisTickAmount,
	yAxisTickAmount,
	yAxisMin,
	yAxisMax,
	xAxisTitle,
	yAxisTitle,
	exportable,
	zoomable,
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
	var yaxis: YAxisAnnotations[] = [];
	var xaxis: XAxisAnnotations[] = [];
	var points: PointAnnotations[] = [];

	//since in the build data is fixed
	if (annotations && annotations.length > 0) {
		yaxis.push({
			y: '20',
			y2: '45',
			label: {
				text: 'Annotation',
			},
		});
	}

	var annotationsObj = { yaxis: yaxis, xaxis: xaxis, points: points };

	const options: ApexOptions = useMemo(
		() => ({
			chart: {
				type: 'bubble',
				zoom: {
					enabled: zoomable,
				},
				toolbar: {
					tools: {
						download: exportable,
					},
				},
			},
			colors: chartColorsArr,
			annotations: {
				yaxis: annotationsObj.yaxis,
				xaxis: annotationsObj.xaxis,
				points: annotationsObj.points,
			},
			dataLabels: {
				enabled: displayLabels,
			},
			legend: {
				show: showLegend,
				position: legendPos,
			},
			title: {
				text: name,
				align: titlePosition,
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'],
					opacity: 0.5,
				},
			},
			xaxis: {
				type: 'category',
				title: {
					text: xAxisTitle,
				},
				tickAmount: xAxisTickAmount,
			},
			yaxis: {
				title: {
					text: yAxisTitle,
				},
				tickAmount: yAxisTickAmount,
				min: yAxisMin,
				max: yAxisMax,
			},
		}),
		[
			legendPos,
			name,
			showLegend,
			titlePosition,
			zoomable,
			exportable,
			annotations,
			xAxisTitle,
			yAxisTitle,
			displayLabels,
			yAxisMin,
			yAxisMax,
			xAxisTickAmount,
			yAxisTickAmount,
			chartColors,
		],
	);

	const series = useMemo(
		// Prevents unnecessary re-renders if no editor changes
		() => [
			{
				name: 'Bubble1',
				data: [
					{ x: '2017-02-11', y: 30, z: 20 },
					{ x: '2017-02-12', y: 40, z: 35 },
					{ x: '2017-02-13', y: 20, z: 25 },
					{ x: '2017-02-14', y: 50, z: 40 },
					{ x: '2017-02-15', y: 60, z: 50 },
					{ x: '2017-02-16', y: 15, z: 10 },
					{ x: '2017-02-17', y: 35, z: 30 },
					{ x: '2017-02-18', y: 45, z: 40 },
					{ x: '2017-02-19', y: 25, z: 20 },
					{ x: '2017-02-20', y: 55, z: 45 },
					{ x: '2017-02-21', y: 65, z: 55 },
					{ x: '2017-02-22', y: 18, z: 15 },
					{ x: '2017-02-23', y: 38, z: 28 },
					{ x: '2017-02-24', y: 48, z: 38 },
					{ x: '2017-02-25', y: 28, z: 18 },
					{ x: '2017-02-26', y: 58, z: 48 },
					{ x: '2017-02-27', y: 68, z: 58 },
					{ x: '2017-02-28', y: 22, z: 12 },
					{ x: '2017-03-01', y: 42, z: 32 },
					{ x: '2017-03-02', y: 52, z: 42 },
				],
			},
			{
				name: 'Bubble2',
				data: [
					{ x: '2017-02-11', y: 12, z: 15 },
					{ x: '2017-02-12', y: 25, z: 10 },
					{ x: '2017-02-13', y: 45, z: 22 },
					{ x: '2017-02-14', y: 33, z: 35 },
					{ x: '2017-02-15', y: 56, z: 20 },
					{ x: '2017-02-16', y: 15, z: 18 },
					{ x: '2017-02-17', y: 60, z: 40 },
					{ x: '2017-02-18', y: 38, z: 30 },
					{ x: '2017-02-19', y: 50, z: 28 },
					{ x: '2017-02-20', y: 22, z: 24 },
					{ x: '2017-02-21', y: 47, z: 15 },
					{ x: '2017-02-22', y: 62, z: 32 },
					{ x: '2017-02-23', y: 19, z: 14 },
					{ x: '2017-02-24', y: 28, z: 38 },
					{ x: '2017-02-25', y: 34, z: 12 },
					{ x: '2017-02-26', y: 53, z: 42 },
					{ x: '2017-02-27', y: 26, z: 50 },
					{ x: '2017-02-28', y: 48, z: 26 },
					{ x: '2017-03-01', y: 29, z: 36 },
					{ x: '2017-03-02', y: 39, z: 18 },
				],
			},
		],
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

export default Bubble;
