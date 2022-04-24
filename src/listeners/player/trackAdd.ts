import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener, ListenerOptions} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import type {Queue, Track} from "discord-player";
import {CommandInteraction, MessageEmbed} from "discord.js";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "trackAdd"
})
export class TrackAddListener extends Listener {
	public async run(queue: Queue<CommandInteraction>, track: Track) {
		if (queue.nowPlaying() === track) return;
		return queue.metadata!.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: await resolveKey<string>(queue.metadata!, "listeners/trackadd:title"),
					description: await resolveKey<string>(queue.metadata!, "listeners/trackadd:description", {
						replace: {track: `[${track.title}](${track.url})`}
					})
				})
			]
		});
	}
}
