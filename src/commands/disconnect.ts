import {SlashCommand} from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {container} from "@sapphire/framework";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "disconnect",
			description: "let the bot disconnect from the currently joined voice channel",
			checks: ["guildOnly", "botInVoice", "inSameVoice"]
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply();

		const {guild} = interaction,
			{channel} = guild.me.voice;

		container.player.deleteQueue(guild);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Disconnect",
					description: `Disconnected from \`${channel.name}\` 🔊`
				})
			]
		});
	}
};
