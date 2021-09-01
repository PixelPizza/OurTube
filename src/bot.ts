import {config} from "dotenv";
import { join } from "path";
import { CustomClient } from "./client";
import { ClientEvent, PlayerEvent } from "./event";
import { Util } from "./util";
config();

const client = new CustomClient({
	intents: [
		"GUILDS",
		"GUILD_VOICE_STATES"
	]
}).registerCommandsIn(join(__dirname, "commands"));

Util
	.getJSFiles("events/client", (events: ClientEvent[], files: string[]) => {
		events.forEach((event, index) => event.once ?
			client.once(event.name, event.run) : client.onCustom(files[index], event.name, event.run));
	})
	.getJSFiles("events/player", (events: PlayerEvent[], files: string[]) => {
		events.forEach((event, index) => client.player.onCustom(files[index], event.name, event.run, event.once));
	});

client.login(process.env.TOKEN);