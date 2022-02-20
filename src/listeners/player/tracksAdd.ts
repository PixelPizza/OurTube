import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue, Track } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "tracksAdd"
})
export class TracksAddListener extends Listener {
	public run(queue: Queue<CommandInteraction>, tracks: Track[]) {
		queue.metadata.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: this.container.getTranslation(queue.metadata, "info:play"),
					description: this.container.getTranslation(queue.metadata, "info:tracksAdd", { replace: { count: tracks.length } })
				})
			]
		});
	}
}