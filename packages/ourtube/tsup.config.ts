import { createTsupConfig } from "../../scripts/tsup.config";
import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";

export default createTsupConfig({
	dts: false,
	entry: ["src/**/*.ts"],
	esbuildPlugins: [esbuildPluginFilePathExtensions()]
});
