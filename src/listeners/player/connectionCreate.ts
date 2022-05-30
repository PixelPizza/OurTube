import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import type {Queue, StreamDispatcher} from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	event: "connectionCreate"
})
export class ConnectionCreateListener extends Listener {
	public run(queue: Queue, connection: StreamDispatcher): void {
		this.container.logger.debug(`[${queue.guild.name}] Now connected to 🔊 ${connection.channel.name}`);
	}
}
