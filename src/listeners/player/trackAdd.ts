import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue, Track } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "trackAdd"
})
export class TrackAddListener extends Listener {
	public run(queue: Queue<CommandInteraction>, track: Track) {
		if (queue.nowPlaying() == track) return;
		queue.metadata.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: "Play",
					description: `[${track.title}](${track.url}) has been added to the queue`
				})
			]
		});
	}
}