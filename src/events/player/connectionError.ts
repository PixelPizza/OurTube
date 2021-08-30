import { Queue } from "discord-player";
import { CustomConsole } from "../../console";
import { PlayerEvent } from "../../event";

module.exports = class extends PlayerEvent<"connectionError"> {
	constructor(){
		super("connectionError");
	}

	run = (queue: Queue, error: Error) => {
		CustomConsole.log(`[${queue.guild.name}] Error from the connection`, error);
	}
}