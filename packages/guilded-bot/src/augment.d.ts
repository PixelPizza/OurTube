declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * The environment in which the application is running.
			 */
			NODE_ENV: "development" | "production" | "test";
		}
	}
}

export {};
