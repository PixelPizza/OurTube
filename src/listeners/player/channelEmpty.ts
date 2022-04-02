import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import type { Queue } from "discord-player";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "channelEmpty"
})
export class ChannelEmptyListener extends Listener {
	public run(queue: Queue) {
		if(!queue.nowPlaying()) {
			queue.destroy();
			this.container.logger.debug(`[${queue.guild.name}] Voice channel empty, now leaving...`);
		}
	}
}