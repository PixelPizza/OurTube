import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { CustomClient } from "../client";
import { SlashCommand } from "../command";

module.exports = class extends SlashCommand {
	constructor(){
		super(new SlashCommandBuilder()
			.setName("disconnect")
			.setDescription("let the bot disconnect from the currently joined voice channel"), 
		{
			ephemeral: false,
			guildOnly: true,
			needsSameVoiceChannel: true,
			botNeedsVoiceChannel: true
		});
	}

	run(interaction: CommandInteraction){
		const client = interaction.client as CustomClient<true>,
			{guild} = interaction,
			{channel} = guild.me.voice;

		client.player.deleteQueue(guild);

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
}