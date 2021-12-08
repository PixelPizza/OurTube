import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue, Track } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "trackStart"
})
export class TrackStartListener extends Listener {
	public run(queue: Queue<CommandInteraction>, track: Track) {
		queue.metadata.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: "Play",
					description: `Now Playing [${track.title}](${track.url})`
				})
			]
		});
	}
}