import {relative, resolve} from "node:path";
import {defineConfig, type Options} from "tsup";

export function createTsupConfig(options: Options = {}) {
	return defineConfig({
		clean: true,
		dts: true,
		entry: ["src/index.ts"],
		minify: false,
		skipNodeModulesBundle: true,
		sourcemap: true,
		target: "es2021",
		tsconfig: relative(__dirname, resolve(process.cwd(), "src", "tsconfig.json")),
		keepNames: true,
		treeshake: true,
		outDir: "dist",
		format: "esm",
		...options
	});
}
