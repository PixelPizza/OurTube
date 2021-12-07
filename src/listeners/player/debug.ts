import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue } from "discord-player";
import { CustomConsole } from "../../console";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	name: "playerDebug",
	event: "debug"
})
export class DebugListener extends Listener {
	run(queue: Queue, message: string) {
		CustomConsole.log(`[${queue.guild.name}] ${message}`);
	}
}