import type { Options } from "tsup";

export const tsup: Options = {
	clean: true,
	dts: false,
	entryPoints: ["src/index.ts", "src/commands/**/*.ts", "src/listeners/**/*.ts"],
	format: ["esm"],
	minify: true,
	skipNodeModulesBundle: true,
	sourcemap: false,
	target: "esnext"
};
