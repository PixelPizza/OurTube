import { Queue } from "discord-player";
import { CustomConsole } from "../../console";
import { PlayerEvent } from "../../event";

module.exports = class extends PlayerEvent<"error"> {
	constructor(){
		super("error");
	}

	run = (queue: Queue, error: Error) => {
		CustomConsole.log(`[${queue.guild.name}] Error from the queue`, error);
	}
}