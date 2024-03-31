<template>
	<div
		:id="echartId"
		:style="{ width: '900px', height: '300px' }"
	></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
let echart = echarts;

const props = defineProps({
	option: {
		type: Object,
		default: () => {},
	},
	echartId: {
		type: String,
		default: "myEcharts",
	},
});
onMounted(() => {
	initChart();
});

// 初始化图表
const initChart = () => {
	let chart = echart.init(document.getElementById(props.echartId));
	setChartData(chart, props.option);
};
// 设置图标数据
const setChartData = (chart, option) => {
	chart.setOption(option);
	window.onresize = function () {
		//自适应大小
		chart.resize();
	};
};

const exportImage = () => {
	var img = new Image();

	let chart = echart.init(document.getElementById(props.echartId));

	img.src = chart.getDataURL({
		type: "png",
		pixelRatio: 1, //放大2倍
		backgroundColor: "#fff",
	});
	img.onload = function () {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL("image/png");

		var a = document.createElement("a");
		var event = new MouseEvent("click");
		a.download = "图片.png" || "下载图片名称";
		// 将生成的URL设置为a.href属性
		a.href = dataURL;
		// 触发a的单击事件
		a.dispatchEvent(event);
		a.remove();
	};
};

defineExpose({
	exportImage,
});
</script>
