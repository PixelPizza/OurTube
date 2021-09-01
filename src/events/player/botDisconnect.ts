import {Queue} from "discord-player";
import {CustomConsole} from "../../console";
import {PlayerEvent} from "../../event";

module.exports = class extends PlayerEvent<"botDisconnect"> {
	constructor() {
		super("botDisconnect");
	}

	run = (queue: Queue) => {
		CustomConsole.log(`[${queue.guild.name}] Got disconnected from guild, now clearing queue!`);
	};
};
