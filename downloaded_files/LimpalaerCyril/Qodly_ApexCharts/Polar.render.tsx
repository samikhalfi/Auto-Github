import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IPolarProps } from './Polar.config';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const Polar: FC<IPolarProps> = ({
	displayLabels,
	chartColors,
	yAxisTickAmount,
	yAxisMax,
	titlePosition,
	legendPosition,
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

			const showLegend = legendPosition !== 'hidden';
			const legendPos: 'top' | 'bottom' | 'left' | 'right' = showLegend
				? legendPosition!
				: 'top';
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

			const options: ApexOptions = {
				chart: {
					type: 'polarArea',
				},
				colors: chartColorsArr,
				labels: datas.options.labels ?? [],
				dataLabels: {
					enabled: datas.options.dataLabels?.enabled ?? displayLabels,
				},
				legend: {
					show: datas.options.legend?.show ?? showLegend,
					position: datas.options.legend?.position ?? legendPos,
				},
				stroke: {
					colors: datas.options.stroke?.colors ?? chartColorsArr,
				},
				title: {
					text: datas.options.title?.text ?? name,
					align: datas.options.title?.align ?? titlePosition,
				},
				grid: {
					row: {
						colors: datas.options.grid?.row?.colors ?? ['#f3f3f3', 'transparent'],
						opacity: datas.options.grid?.row?.opacity ?? 0.5,
					},
				},
				yaxis: {
					tickAmount: datas.options.yaxis?.tickAmount ?? yAxisTickAmount,
					max: datas.options.yaxis?.max ?? yAxisMax,
				},
				responsive: datas.options.responsive ?? [],
			};
			var series: any[] = datas.series;

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
			<ReactApexChart
				options={chartData.options}
				series={chartData.series}
				type="polarArea"
			/>
		</div>
	);
};

export default Polar;
