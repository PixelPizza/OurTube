import {config} from "dotenv";
import {join} from "path";
import {CustomClient} from "./client";
import {PlayerEvent} from "./event";
import {Util} from "./util";
config();

const client = new CustomClient({
	intents: ["GUILDS", "GUILD_VOICE_STATES"]
}).addEventsIn(join(__dirname, "events/client"));

client.registry
	.registerCommandsIn(join(__dirname, "commands"))
	.registerCommandChecksIn(join(__dirname, "checks"));

Util.getJSFiles("events/player", (events: PlayerEvent[], files: string[]) => {
	events.forEach((event, index) => client.player.onCustom(files[index], event.name, event.run, event.once));
});

client.login(process.env.TOKEN);
