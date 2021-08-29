import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { CustomClient, GuildSettings } from "../client";
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
			{guildId} = interaction;

		if(!(interaction.member as GuildMember).voice.channel.equals(interaction.guild.me.voice.channel)){
			interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Can't disconnect",
						description: "You need to be in the same voice channel to disconnect"
					})
				]
			});
			return;
		}

		client.settings.get(guildId).connection.destroy();
		client.settings.set(guildId, GuildSettings.default);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Disconnect",
					description: `Disconnected from \`${interaction.guild.me.voice.channel.name}\` 🔊`
				})
			]
		});
	}
}