declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * The environment in which the application is running.
			 */
			NODE_ENV: "development" | "production" | "test";
			/**
			 * The token used to authenticate with the Guilded API.
			 */
			GUILDED_TOKEN: string;
		}
	}
}

export {};
