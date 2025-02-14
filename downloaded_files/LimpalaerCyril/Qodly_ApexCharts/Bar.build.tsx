import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import { IBarProps } from './Bar.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Bar: FC<IBarProps> = ({
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
	titlePosition,
	legendPosition,
	orientation,
	name,
	stacked,
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

	//since data in build is fixed
	if (annotations && annotations.length > 0) {
		yaxis.push({
			y: '70',
			y2: '90',
			label: {
				text: 'Annotation',
			},
		});
	}

	var annotationsObj = { yaxis: yaxis, xaxis: xaxis, points: points };
	var datamultiplier = 1;
	if (yAxisMax) {
		datamultiplier = yAxisMax / 150;
	}

	const options: ApexOptions = useMemo(
		() => ({
			chart: {
				type: 'bar',
				toolbar: {
					tools: {
						download: exportable,
					},
				},
				stacked: stacked,
				stackType: 'normal',
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
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
			stacked,
			name,
			orientation,
			showLegend,
			titlePosition,
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
				name: 'Value 1',
				data: Array.from({ length: 9 }, () =>
					Math.floor(Math.random() * 150 * datamultiplier),
				),
			},
			{
				name: 'Value 2',
				data: Array.from({ length: 9 }, () =>
					Math.floor(Math.random() * 150 * datamultiplier),
				),
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
			<ReactApexChart
				options={chart.options}
				series={chart.series}
				type={chart.options.chart?.type}
			/>
		</div>
	);
};

export default Bar;
