import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IHeatmapProps } from './Heatmap.config';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Heatmap: FC<IHeatmapProps> = ({
	displayLabels,
	chartColors = [],
	xAxisTitle,
	yAxisTitle,
	exportable,
	titlePosition,
	colorFlipper,
	colorRanges,
	name,
	style,
	className,
	classNames = [],
}) => {
	const { connect } = useRenderer();
	const [chartData, setChartData] = useState<any>(null);
	const {
		sources: { datasource: ds },
	} = useSources();

	useEffect(() => {
		if (!ds) return;

		const listener = async () => {
			const v = await ds.getValue<any>();
			var datas;
			if (typeof v === 'string') datas = JSON.parse(v);
			else datas = JSON.parse(JSON.stringify(v));

			let initialColors = ['#008FFB'];
			const chartColorsArr =
				chartColors.length > 0
					? chartColors?.map((color) =>
							color.color.length > 7 ? color.color.substring(0, 7) : color.color,
						)
					: initialColors;

			const options: ApexOptions = {
				chart: {
					type: 'heatmap',
					toolbar: {
						tools: {
							download: datas.options?.chart?.toolbar?.tools?.download ?? exportable,
						},
					},
				},
				plotOptions: {
					heatmap: {
						colorScale: {
							inverse:
								datas.options?.plotOptions?.heatmap?.colorScale?.inverse ??
								colorFlipper,
							ranges:
								datas.options?.plotOptions?.heatmap?.colorScale?.ranges ??
								colorRanges?.map((color) => ({
									from: color.from,
									to: color.to,
									color:
										color.color.length > 7
											? color.color.substring(0, 7)
											: color.color,
								})) ??
								[],
						},
					},
				},
				colors: chartColorsArr,
				dataLabels: {
					enabled: datas.options?.dataLabels?.enabled ?? displayLabels,
				},
				title: {
					text: datas.options?.title?.text ?? name,
					align: datas.options?.title?.align ?? titlePosition,
				},
				grid: {
					row: {
						colors: datas.options?.grid?.row?.colors ?? ['#f3f3f3', 'transparent'],
						opacity: datas.options?.grid?.row?.opacity ?? 0.5,
					},
				},
				xaxis: {
					type: 'category',
					title: {
						text: datas.options?.xaxis?.title?.text ?? xAxisTitle,
					},
				},
				yaxis: {
					title: {
						text: datas.options?.yaxis?.title?.text ?? yAxisTitle,
					},
				},
			};
			var series: any[] = datas.series ?? [];

			var chart = {
				options: options,
				series: series,
			};

			setChartData(chart);
		};

		listener();

		ds.addListener('changed', listener);

		return () => {
			ds.removeListener('changed', listener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ds]);

	if (!chartData) return null;

	return (
		<div ref={connect} style={style} className={cn(className, classNames)}>
			<ReactApexChart options={chartData.options} series={chartData.series} type="heatmap" />
		</div>
	);
};

export default Heatmap;
