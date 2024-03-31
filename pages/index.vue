<template>
	<dropdown-btn-list
		buttonName="操作"
		:buttonList="buttonList"
		@handleCommand="handleCommand"
	/>
	<data-view
		ref="dataViewRef"
		:echartId="echartId"
		:option="option"
	/>
</template>
<script setup lang="ts">
const echartId = ref("myChart");
const option = ref({
	xAxis: {
		type: "category",
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	},
	yAxis: {
		type: "value",
	},
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: "line",
		},
	],
});

const dataAssembly = (Xdata, Ydata) => {
	return [
		{ data: "Mon", value: 150 },
		{ data: "Tue", value: 230 },
		{ data: "Wed", value: 224 },
		{ data: "Thu", value: 218 },
		{ data: "Fri", value: 135 },
		{ data: "Sat", value: 147 },
		{ data: "Sun", value: 260 },
	];
};

const handleCommand = (command) => {
	command();
};
const exportExcel = () => {
	const filename = "数据报表";
	const autoWidth = true;
	const bookType = "xlsx";
	const header = ["日期", "值"];
	const headValue = ["data", "value"];
	const formatJson = (headValue, jsonData) => {
		return jsonData.map((v) => headValue.map((key) => v[key]).reduce((acc, val) => [...acc, val], []));
	};

	export_json_to_excel({
		header,
		data: formatJson(headValue, dataAssembly()),
		filename: filename,
		autoWidth: autoWidth,
		bookType: bookType,
	});
};

const dataViewRef = ref(null);
const exportImage = () => {
	console.log("🚀 ~ dataViewRef:", dataViewRef);

	console.log(dataViewRef.value.exportImage());
};

const exportJson = () => {
	exportFileJSON(dataAssembly());
};
const exportFileJSON = (data = {}, filename = "dataJSON.json") => {
	if (typeof data === "object") {
		data = JSON.stringify(data, null, 4);
	}
	// 导出数据
	const blob = new Blob([data], { type: "text/json" }),
		e = new MouseEvent("click"),
		a = document.createElement("a");

	a.download = filename;
	a.href = window.URL.createObjectURL(blob);
	a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
	a.dispatchEvent(e);
};

const buttonList = [
	{ desc: "导出excel", command: exportExcel },
	{ desc: "导出图片", command: exportImage },
	{ desc: "导出数据", command: exportJson },
];
</script>

<style scoped>
.chart-container {
	height: 100vh;
}
</style>
