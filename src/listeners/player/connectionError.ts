import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue } from "discord-player";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "connectionError"
})
export class ConnectionErrorListener extends Listener {
	public run(queue: Queue, error: Error) {
		this.container.logger.debug(`[${queue.guild.name}] Error from the connection`, error);
	}
}