import {config} from "dotenv";
import {PlayerEvent} from "./event";
import {Util} from "./util";
import {Player} from "discord-player";
import {container, SapphireClient} from "@sapphire/framework";
config();

const client = new SapphireClient({
	intents: ["GUILDS", "GUILD_VOICE_STATES"]
});
container.player = new Player(client);

Util.getJSFiles("events/player", (events: PlayerEvent[], files: string[]) => {
	events.forEach(event => event.once ? container.player.once(event.name, event.run) : container.player.on(event.name, event.run));
});

client.login(process.env.TOKEN);
