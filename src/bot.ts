import {container, SapphireClient} from "@sapphire/framework";
import {IntentsBitField} from "discord.js";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-i18next/register";
import "@kaname-png/plugin-statcord/register";
import {setContainerPlayer} from "./container";

const client = new SapphireClient({
	intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildVoiceStates],
	statcord: {
		client_id: container.env.CLIENT,
		key: container.env.STATCORD_API_KEY,
		autopost: true,
		debug: true
	}
});
setContainerPlayer(client);

async function main() {
	await container.player.extractors.loadDefault();

	await client.login(container.env.TOKEN).finally(() => container.prisma.$disconnect());
}

void main();
