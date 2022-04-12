import type {Options} from "tsup";

export const tsup: Options = {
	clean: true,
	dts: false,
	entryPoints: [
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
};
