import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener, ListenerOptions} from "@sapphire/framework";
import type {Queue} from "discord-player";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	name: "playerDebug",
	event: "debug"
})
export class DebugListener extends Listener {
	public run(queue: Queue, message: string) {
		this.container.logger.debug(`[${queue.guild.name}] ${message}`);
	}
}
