import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import type {Queue, Track} from "discord-player";
import {CommandInteraction, EmbedBuilder, Colors} from "discord.js";
import {resolveMaybeKey} from "../../utils";

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
					.setTitle(await resolveMaybeKey(queue.metadata!, "listeners/trackstart:title"))
					.setDescription(
						await resolveMaybeKey(queue.metadata!, "listeners/trackstart:description", {
							replace: {track: `[${track.title}](${track.url})`}
						})
					)
			]
		});
	}
}
