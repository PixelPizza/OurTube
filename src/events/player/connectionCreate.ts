import { Queue, StreamDispatcher } from "discord-player";
import { CommandInteraction } from "discord.js";
import { CustomConsole } from "../../console";
import { PlayerEvent } from "../../event";

module.exports = class extends PlayerEvent<"connectionCreate"> {
	constructor(){
		super("connectionCreate");
	}

	run = (queue: Queue<CommandInteraction>, connection: StreamDispatcher) => {
		CustomConsole.log(`[${queue.guild.name}] Now connected to 🔊 ${connection.channel.name}`);
	}
}