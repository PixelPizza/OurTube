import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import type { GuildQueue } from "discord-player";

@ApplyOptions<Listener.Options>(({ container }) => ({
	emitter: container.player.events,
	name: "playerError",
	event: "error"
}))
export class ErrorListener extends Listener {
	public run(queue: GuildQueue, error: Error): void {
		this.container.logger.error(`[${queue.guild.name}] Error from the queue`, error);
	}
}
