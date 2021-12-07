import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue } from "discord-player";
import { CustomConsole } from "../../console";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	name: "playerError",
	event: "error"
})
export class ErrorListener extends Listener {
	public run(queue: Queue, error: Error) {
		CustomConsole.log(`[${queue.guild.name}] Error from the queue`, error);
	}
}