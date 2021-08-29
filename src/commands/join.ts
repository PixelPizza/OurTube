import { SlashCommandBuilder } from "@discordjs/builders";
import { joinVoiceChannel } from "@discordjs/voice";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { CustomClient } from "../client";
import { SlashCommand } from "../command";

module.exports = class extends SlashCommand {
	constructor(){
		super(new SlashCommandBuilder()
			.setName("join")
			.setDescription("let the bot join your voice channel"),
		{
			ephemeral: false,
			guildOnly: true,
			needsVoiceChannel: true
		});
	}

	run(interaction: CommandInteraction){
		const client = interaction.client as CustomClient,
			{guildId, member, guild} = interaction,
			{voice} = member as GuildMember,
			settings = client.settings.get(guildId);
		
		settings.connection = joinVoiceChannel({
			guildId: guildId,
			channelId: voice.channelId,
			adapterCreator: guild.voiceAdapterCreator
		});

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Join",
					description: `Joined \`${voice.channel.name}\` 🔊`
				})
			]
		});
		client.settings.set(guildId, settings);
	}
}