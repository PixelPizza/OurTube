import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import type { GuildQueue } from "discord-player";

@ApplyOptions<Listener.Options>(({ container }) => ({
	emitter: container.player.events,
	event: "emptyChannel"
}))
export class ChannelEmptyListener extends Listener {
	public run(queue: GuildQueue): void {
		if (!queue.currentTrack) {
			queue.delete();
			this.container.logger.debug(`[${queue.guild.name}] Voice channel empty, now leaving...`);
		}
	}
}
