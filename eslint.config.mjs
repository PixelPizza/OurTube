import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier/flat";

export default tseslint.config(
	{
		extends: [
			tseslint.configs.recommended,
			tseslint.configs.strict,
			tseslint.configs.stylistic,
			prettier,
			prettierConfig
		],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.eslint.json",
				sourceType: "module",
				ecmaVersion: 2020,
				warnOnUnsupportedTypeScriptVersion: false
			}
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			prettier: prettierPlugin
		},
		rules: {
			"no-await-in-loop": "warn",
			"no-constructor-return": "warn",
			"no-duplicate-imports": "error",
			"no-self-compare": "warn",
			"no-template-curly-in-string": "warn",
			"no-unreachable-loop": "warn",
			"no-useless-assignment": "error",
			complexity: "warn",
			"consistent-return": "error",
			"default-case-last": "error",
			eqeqeq: "warn",
			"max-classes-per-file": [
				"error",
				{ ignoreExpressions: true, max: 1 }
			],
			"max-depth": ["error", 4],
			"max-nested-callbacks": ["error", 3],
			"max-params": ["error", 4],
			"no-invalid-this": "error",
			"no-iterator": "error",
			"no-lone-blocks": "warn",
			"no-new-wrappers": "error",
			"no-proto": "error",
			"no-return-assign": "error",
			"no-throw-literal": "error",
			"no-useless-rename": "error",
			"no-var": "error",
			"prefer-const": "error",
			"require-await": "error",
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/member-ordering": "warn"
		},
		files: ["**/*.ts", "**/*.mts", "**/*.cts"]
	},
	{
		ignores: ["node_modules/", "**/dist", "**/*.d.ts", "**/coverage/"]
	}
);
