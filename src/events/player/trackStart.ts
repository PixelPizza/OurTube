import { Queue, Track } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { PlayerEvent } from "../../event";

module.exports = class extends PlayerEvent<"trackStart"> {
	constructor(){
		super("trackStart");
	}

	run = (queue: Queue<CommandInteraction>, track: Track) => {
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