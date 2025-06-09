import { SapphireClient } from "@sapphire/framework";

process.env.NODE_ENV ||= "development";
await import("dotenv-cra").then((m) => m.config());

const client = new SapphireClient({
	intents: []
});

await client.login();
