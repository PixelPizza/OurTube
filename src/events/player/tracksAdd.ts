import { Queue, Track } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { PlayerEvent } from "../../event";

module.exports = class extends PlayerEvent<"tracksAdd"> {
	constructor(){
		super("tracksAdd");
	}

	run = (queue: Queue<CommandInteraction>, tracks: Track[]) => {
		queue.metadata.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: "Play",
					description: `${tracks.length} songs added`
				})
			]
		});
	}
}