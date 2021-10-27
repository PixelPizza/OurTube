import {Queue, Util} from "discord-player";
import {CustomConsole} from "../../console";
import {PlayerEvent} from "../../event";

module.exports = class extends PlayerEvent<"queueEnd"> {
	constructor() {
		super("queueEnd");
	}

	run = (queue: Queue) => {
		if(Util.isVoiceEmpty(queue.connection.channel)) {
			queue.destroy();
			CustomConsole.log(`[${queue.guild.name}] Queue finished!`);
		}
	};
};
