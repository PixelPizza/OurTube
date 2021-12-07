import {config} from "dotenv";
import {Player} from "discord-player";
import {container, SapphireClient} from "@sapphire/framework";
config();

const client = new SapphireClient({
	intents: ["GUILDS", "GUILD_VOICE_STATES"]
});
container.player = new Player(client);

client.login(process.env.TOKEN);
