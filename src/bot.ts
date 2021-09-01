import {config} from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import { CustomClient } from "./client";
import { PlayerEvent } from "./event";
config();

const client = new CustomClient({
	intents: [
		"GUILDS",
		"GUILD_VOICE_STATES"
	]
})
	.registerCommandsIn(join(__dirname, "commands"))
	.addEventsIn(join(__dirname, "events/client"));

for(const file of readdirSync(join(__dirname, "events/player")).filter(file => file.endsWith(".js"))){
	let event: PlayerEvent = require(`./events/player/${file}`);
	// create new if value is a class
	// @ts-ignore
	try { event = new event(); } catch {}
	client.player.onCustom(file, event.name, event.run, event.once);
}

client.login(process.env.TOKEN);