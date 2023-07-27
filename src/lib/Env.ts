import { s } from "@sapphire/shapeshift";

const envWebhookURL = s.string.url({ allowedProtocols: ["https:"], allowedDomains: ["discord.com"] });

const envVariables = s.object({
	TOKEN: s.string,
	CONSOLE_URL: envWebhookURL,
	GUILDS_URL: envWebhookURL,
	GUILD: s.string,
	OWNER: s.string,
	CLIENT: s.string,
	DATABASE_URL: s.string.url({
		allowedProtocols: ["postgres:", "mysql:", "file:", "mongodb:", "sqlserver:"]
	}),
	STATCORD_API_KEY: s.string
});

export function parseEnv(env: Record<string, string | undefined> = process.env) {
	return envVariables.parse(env);
}
