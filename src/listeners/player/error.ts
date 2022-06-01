import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import type {Queue} from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	name: "playerError",
	event: "error"
})
export class ErrorListener extends Listener {
	public run(queue: Queue, error: Error): void {
		this.container.logger.error(`[${queue.guild.name}] Error from the queue`, error);
	}
}
