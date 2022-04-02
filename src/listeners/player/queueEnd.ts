import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { type Queue, Util } from "discord-player";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "queueEnd"
})
export class QueueEndListener extends Listener {
	public run(queue: Queue) {
		if(Util.isVoiceEmpty(queue.connection.channel)) {
			queue.destroy();
			this.container.logger.debug(`[${queue.guild.name}] Queue finished!`);
		}
	}
}