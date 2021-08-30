import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
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
			needsVoiceChannel: true
		});
	}

	run(interaction: CommandInteraction){
		const client = interaction.client as CustomClient<true>,
			{guild} = interaction,
			{channel} = guild.me.voice;

		if(!(interaction.member as GuildMember).voice.channel.equals(channel)){
			return void interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Can't disconnect",
						description: "You need to be in the same voice channel to disconnect"
					})
				]
			});
		}

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