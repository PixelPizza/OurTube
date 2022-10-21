import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import type {Queue, Track} from "discord-player";
import {CommandInteraction, EmbedBuilder, Colors} from "discord.js";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	event: "trackStart"
})
export class TrackStartListener extends Listener {
	public async run(queue: Queue<CommandInteraction>, track: Track): Promise<any> {
		return queue.metadata!.followUp({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Blue)
					.setTitle(await resolveKey(queue.metadata!, "listeners/trackstart:title"))
					.setDescription(
						await resolveKey(queue.metadata!, "listeners/trackstart:description", {
							replace: {track: `[${track.title}](${track.url})`}
						})
					)
			]
		});
	}
}
