import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IRangeBarProps } from './RangeBar.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Bar: FC<IRangeBarProps> = ({
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
	orientation,
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
	if (annotations && annotations.length != 0) {
		yaxis.push({
			y: '3',
			y2: '7',
			label: {
				text: 'Annotation',
			},
		});
	}
	var annotationsObj = { yaxis: yaxis, xaxis: xaxis, points: points };

	const options: ApexOptions = useMemo(
		() => ({
			chart: {
				type: 'rangeBar',
				zoom: {
					enabled: zoomable,
				},
				toolbar: {
					tools: {
						download: exportable,
					},
				},
			},
			plotOptions: {
				bar: {
					horizontal: orientation === 'horizontal',
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
			orientation,
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
			chartColorsArr,
		],
	);

	const series = useMemo(
		// Prevents unnecessary re-renders if no editor changes
		() => [
			{
				data: [
					{
						x: 'Team A',
						y: [1, 5],
					},
					{
						x: 'Team B',
						y: [4, 6],
					},
					{
						x: 'Team C',
						y: [5, 8],
					},
					{
						x: 'Team D',
						y: [3, 11],
					},
				],
			},
			{
				data: [
					{
						x: 'Team A',
						y: [2, 6],
					},
					{
						x: 'Team B',
						y: [1, 3],
					},
					{
						x: 'Team C',
						y: [7, 8],
					},
					{
						x: 'Team D',
						y: [5, 9],
					},
				],
			},
		],
		[yAxisMax],
	);

	const chart = {
		series: series,
		options: options,
	};

	return (
		<div ref={connect} style={style} className={cn(className, classNames)}>
			<ReactApexChart options={chart.options} series={chart.series} type="rangeBar" />
		</div>
	);
};

export default Bar;
