import {defineConfig, type ViteUserConfig} from "vitest/config";
import type {ESBuildOptions} from "vite";

export const createVitestConfig = (options: ViteUserConfig = {}) =>
	defineConfig({
		...options,
		test: {
			...options?.test,
			globals: true,
			coverage: {
				...options.test?.coverage,
				provider: "v8",
				enabled: true,
				reporter: ["text", "lcov"],
				exclude: [
					...(options.test?.coverage?.exclude ?? []),
					"**/node_modules/**",
					"**/dist/**",
					"**/test/**",
					"**/tsup.config.ts",
					"**/vitest.config.ts",
					"commitlint.config.mjs",
					"eslint.config.mjs",
					"lint-staged.config.mjs",
					"prettier.config.mjs",
					".yarn/**",
				],
			}
		},
		esbuild: {
			...options?.esbuild,
			target: (options?.esbuild as ESBuildOptions | undefined)?.target ?? "es2021"
		}
	});
