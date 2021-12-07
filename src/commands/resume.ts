import { container } from "@sapphire/framework";
import {SlashCommand} from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "resume",
			description: "resume the current song",
			checks: ["guildOnly", "botInVoice", "inSameVoice"]
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = container.player.getQueue(interaction.guild);
		
		queue.setPaused(false);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Resume",
					description: `Resumed the current playing song`
				})
			]
		});
	}
};
