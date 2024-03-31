// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
	devtools: { enabled: true },

	alias: {
		"@": resolve(__dirname, "/"),
	},
	build: {
		transpile: [/echarts/],
	},

	modules: ["@element-plus/nuxt"],
	css: ["element-plus/dist/index.css"],
});
