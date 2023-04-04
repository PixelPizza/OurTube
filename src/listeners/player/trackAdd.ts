import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import type {GuildQueue, Track} from "discord-player";
import {CommandInteraction, EmbedBuilder, Colors} from "discord.js";
import {resolveMaybeKey} from "../../utils";

@ApplyOptions<Listener.Options>({
	emitter: container.player.events,
	event: "trackAdd"
})
export class TrackAddListener extends Listener {
	public async run(queue: GuildQueue<CommandInteraction>, track: Track): Promise<any> {
		if (queue.currentTrack === track) return;
		return queue.metadata!.followUp({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Blue)
					.setTitle(await resolveMaybeKey(queue.metadata!, "listeners/trackadd:title"))
					.setDescription(
						await resolveMaybeKey(queue.metadata!, "listeners/trackadd:description", {
							replace: {track: `[${track.title}](${track.url})`}
						})
					)
			]
		});
	}
}
