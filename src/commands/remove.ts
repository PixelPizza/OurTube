import { container } from "@sapphire/framework";
import {SlashCommand} from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "remove",
			description: "remove a song from the current queue",
			options: [
				{
					type: "INTEGER",
					name: "index",
					description: "The queue index of the song to remove",
					required: true
				}
			],
			checks: ["guildOnly", "botInVoice", "inSameVoice"]
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = container.player.getQueue(interaction.guild),
			index = interaction.options.getInteger("index"),
			removed = queue.remove(index-1);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Remove",
					description: `Removed [${removed.title}](${removed.url}) from the queue at index ${index}`
				})
			]
		});
	}
};
