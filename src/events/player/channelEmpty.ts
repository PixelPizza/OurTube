import { Queue } from "discord-player";
import { CustomConsole } from "../../console";
import { PlayerEvent } from "../../event";

module.exports = class extends PlayerEvent<"channelEmpty"> {
	constructor(){
		super("channelEmpty");
	}

	run = (queue: Queue) => {
		CustomConsole.log(`[${queue.guild.name}] Voice channel empty, now leaving...`);
	}
}