import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener } from "@sapphire/framework";
import type { GuildQueue, StreamDispatcher } from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player.events,
	event: "connection"
})
export class ConnectionCreateListener extends Listener {
	public run(queue: GuildQueue, connection: StreamDispatcher): void {
		this.container.logger.debug(`[${queue.guild.name}] Now connected to 🔊 ${connection.channel.name}`);
	}
}
