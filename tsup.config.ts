import {defineConfig} from "tsup";

export default defineConfig({
	clean: true,
	dts: false,
	entry: ["src/**/*.ts", "!src/**/*.d.ts", "!src/index.ts"],
	format: ["cjs"],
	minify: true,
	skipNodeModulesBundle: true,
	sourcemap: false,
	target: "esnext"
});
