import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import {type GuildQueue, Util} from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	event: "queueEnd"
})
export class QueueEndListener extends Listener {
	public run(Queue: Queue): void {
		if (Util.isVoiceEmpty(queue.connection.channel)) {
			queue.delete();
			this.container.logger.debug(`[${queue.guild.name}] Queue finished!`);
		}
	}
}
