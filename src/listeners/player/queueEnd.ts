import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import {type Queue, Util} from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	event: "queueEnd"
})
export class QueueEndListener extends Listener {
	public run(queue: Queue): void {
		if (Util.isVoiceEmpty(queue.connection.channel)) {
			queue.destroy();
			this.container.logger.debug(`[${queue.guild.name}] Queue finished!`);
		}
	}
}
