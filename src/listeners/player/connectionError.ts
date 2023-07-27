import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener } from "@sapphire/framework";
import type { GuildQueue } from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player.events,
	event: "playerError"
})
export class ConnectionErrorListener extends Listener {
	public run(queue: GuildQueue, error: Error): void {
		this.container.logger.debug(`[${queue.guild.name}] Error from the connection`, error);
	}
}
