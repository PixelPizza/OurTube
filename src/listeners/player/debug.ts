import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener } from "@sapphire/framework";
import type { GuildQueue } from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player.events,
	name: "playerDebug",
	event: "debug"
})
export class DebugListener extends Listener {
	public run(queue: GuildQueue, message: string): void {
		this.container.logger.debug(`[${queue.guild.name}] ${message}`);
	}
}
