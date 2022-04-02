import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import type { Queue, Track } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "trackAdd"
})
export class TrackAddListener extends Listener {
	public run(queue: Queue<CommandInteraction>, track: Track) {
		if (queue.nowPlaying() == track) return;
		queue.metadata!.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: this.container.getTranslation(queue.metadata!, "listeners/trackadd:title"),
					description: this.container.getTranslation(queue.metadata!, "listeners/trackadd:description", { replace: { track: `[${track.title}](${track.url})` } })
				})
			]
		});
	}
}