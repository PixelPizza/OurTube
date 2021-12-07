import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue, Util } from "discord-player";
import { CustomConsole } from "../../console";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "queueEnd"
})
export class QueueEndListener extends Listener {
	public run(queue: Queue) {
		if(Util.isVoiceEmpty(queue.connection.channel)) {
			queue.destroy();
			CustomConsole.log(`[${queue.guild.name}] Queue finished!`);
		}
	}
}