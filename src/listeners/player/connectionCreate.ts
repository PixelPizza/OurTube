import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue, StreamDispatcher } from "discord-player";
import { CustomConsole } from "../../console";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "connectionCreate"
})
export class ConnectionCreateListener extends Listener {
	public run(queue: Queue, connection: StreamDispatcher) {
		CustomConsole.log(`[${queue.guild.name}] Now connected to 🔊 ${connection.channel.name}`);
	}
}