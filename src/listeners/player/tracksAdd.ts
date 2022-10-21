import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import type {Queue, Track} from "discord-player";
import {CommandInteraction, EmbedBuilder, Colors} from "discord.js";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	event: "tracksAdd"
})
export class TracksAddListener extends Listener {
	public async run(queue: Queue<CommandInteraction>, tracks: Track[]): Promise<any> {
		return queue.metadata!.followUp({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Blue)
					.setTitle(await resolveKey(queue.metadata!, "listeners/tracksadd:title"))
					.setDescription(
						await resolveKey(queue.metadata!, "listeners/tracksadd:description", {
							replace: {count: tracks.length}
						})
					)
			]
		});
	}
}
