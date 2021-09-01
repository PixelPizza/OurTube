import {Queue, Track} from "discord-player";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {PlayerEvent} from "../../event";

module.exports = class extends PlayerEvent<"trackAdd"> {
	constructor() {
		super("trackAdd");
	}

	run = (queue: Queue<CommandInteraction>, track: Track) => {
		if (queue.nowPlaying() == track) return;
		queue.metadata.followUp({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: "Play",
					description: `[${track.title}](${track.url}) has been added to the queue`
				})
			]
		});
	};
};
