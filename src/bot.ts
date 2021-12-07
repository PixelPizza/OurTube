import {SlashCommandCheck, Client} from "discord-extend";
import {config} from "dotenv";
import {join} from "path";
import {PlayerEvent} from "./event";
import {Util} from "./util";
import {Player} from "discord-player";
import {container} from "@sapphire/framework";
config();

const client = new Client({
	intents: ["GUILDS", "GUILD_VOICE_STATES"]
}).addEventsIn(join(__dirname, "events/client"));
container.player = new Player(this);

client.registry
	.registerCommandsIn(join(__dirname, "commands"))
	.registerCommandChecks(...Object.values(SlashCommandCheck.DEFAULT));

Util.getJSFiles("events/player", (events: PlayerEvent[], files: string[]) => {
	events.forEach(event => event.once ? container.player.once(event.name, event.run) : container.player.on(event.name, event.run));
});

client.login(process.env.TOKEN);
