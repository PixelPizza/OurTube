import {defineConfig} from "tsup";

export default defineConfig({
	clean: true,
	dts: false,
	entry: [
		"src/sharder.ts",
		"src/bot.ts",
		"src/commands/**/*.ts",
		"src/listeners/**/*.ts",
		"src/preconditions/**/*.ts"
	],
	format: ["cjs"],
	minify: true,
	skipNodeModulesBundle: true,
	sourcemap: false,
	target: "esnext"
});
