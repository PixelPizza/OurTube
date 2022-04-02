import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import type { Queue } from "discord-player";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "botDisconnect"
})
export class BotDisconnectListener extends Listener {
	public run(queue: Queue) {
		this.container.logger.debug(`[${queue.guild.name}] Got disconnected from guild, now clearing queue!`);
	}
}