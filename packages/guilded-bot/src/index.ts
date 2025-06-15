import { Client } from "guilded.js";

process.env.NODE_ENV ||= "development";
await import("dotenv-cra").then((m) => m.config());

const client = new Client({
	token: process.env.GUILDED_TOKEN
});

process.once("exit", (code: number) => {
	console.log("[INFO] Process exited with code:", code);
});

process.on("uncaughtException", (error: Error, origin: string) => {
	console.error("Uncaught Exception:", error, "Origin:", origin);
});

process.on(
	"unhandledRejection",
	(reason: string, promise: Promise<unknown>) => {
		console.error("Unhandled Promise Rejection:", reason, promise);
	}
);

process.on("warning", (warning: Error) => {
	console.warn("A warning occurred:", warning);
});

client.on("debug", (data: unknown) => {
	console.debug(data);
});

client.on("error", (reason: string, error: Error) => {
	console.error("An error occurred:", reason, error);
});

client.once("ready", () => {
	console.log(`Logged in as ${client.user?.name} (${client.user?.id})`);
});

client.login();
