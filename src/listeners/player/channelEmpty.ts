import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue } from "discord-player";
import { CustomConsole } from "../../console";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "channelEmpty"
})
export class ChannelEmptyListener extends Listener {
	public run(queue: Queue) {
		if(!queue.nowPlaying()) {
			queue.destroy();
			CustomConsole.log(`[${queue.guild.name}] Voice channel empty, now leaving...`);
		}
	}
}