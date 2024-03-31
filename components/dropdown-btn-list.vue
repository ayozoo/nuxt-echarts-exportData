<template>
	<el-dropdown @command="handleCommand">
		<el-button type="default">
			{{ buttonName }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="(item, index) in buttonList"
					:key="index"
					:command="item.command"
					>{{ item.desc }}</el-dropdown-item
				>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup lang="ts">
const props = defineProps({
	buttonName: {
		type: String,
		default: "操作",
	},
	buttonList: {
		type: Array,
		default: () => [],
	},
});

// defineEmits
const emit = defineEmits(["handleCommand"]);
const handleCommand = (command: string) => {
	emit("handleCommand", command);
};
</script>
