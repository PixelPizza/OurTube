import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener, ListenerOptions} from "@sapphire/framework";
import type {Queue, Track} from "discord-player";
import {CommandInteraction, MessageEmbed} from "discord.js";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "trackStart"
})
export class TrackStartListener extends Listener {
	public run(queue: Queue<CommandInteraction>, track: Track) {
		return queue.metadata!.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: this.container.getTranslation(queue.metadata!, "listeners/trackstart:title"),
					description: this.container.getTranslation(queue.metadata!, "listeners/trackstart:description", {
						replace: {track: `[${track.title}](${track.url})`}
					})
				})
			]
		});
	}
}
