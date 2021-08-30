import { Queue } from "discord-player";
import { CustomConsole } from "../../console";
import { PlayerEvent } from "../../event";

module.exports = class extends PlayerEvent<"debug"> {
	constructor(){
		super("debug");
	}

	run = (queue: Queue, message: string) => {
		CustomConsole.log(`[${queue.guild.name}] ${message}`);
	}
}