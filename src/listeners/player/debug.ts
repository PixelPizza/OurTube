import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import type {Queue} from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	name: "playerDebug",
	event: "debug"
})
export class DebugListener extends Listener {
	public run(queue: Queue, message: string): void {
		this.container.logger.debug(`[${queue.guild.name}] ${message}`);
	}
}
