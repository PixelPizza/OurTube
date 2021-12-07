import {SlashCommand} from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {container} from "@sapphire/framework";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "pause",
			description: "pause the current song",
			checks: ["guildOnly", "botInVoice", "inSameVoice"]
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = container.player.getQueue(interaction.guild);
		
		queue.setPaused(true);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Pause",
					description: `Paused the current playing song`
				})
			]
		});
	}
};
