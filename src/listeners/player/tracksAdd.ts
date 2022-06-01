import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import type {Queue, Track} from "discord-player";
import {CommandInteraction, MessageEmbed} from "discord.js";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	event: "tracksAdd"
})
export class TracksAddListener extends Listener {
	public async run(queue: Queue<CommandInteraction>, tracks: Track[]): Promise<any> {
		return queue.metadata!.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: await resolveKey<string>(queue.metadata!, "listeners/tracksadd:title"),
					description: await resolveKey<string>(queue.metadata!, "listeners/tracksadd:description", {
						replace: {count: tracks.length}
					})
				})
			]
		});
	}
}
