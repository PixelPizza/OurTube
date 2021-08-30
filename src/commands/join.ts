import { SlashCommandBuilder } from "@discordjs/builders";
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

	async run(interaction: CommandInteraction, sendReply: boolean = true){
		const client = interaction.client as CustomClient,
			{member, guild} = interaction,
			{voice} = member as GuildMember;

		const queue = client.player.createQueue(guild, {metadata: interaction});

		try {
			if (!queue.connection) await queue.connect(voice.channel);
		} catch {
			client.player.deleteQueue(guild);
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Can't join voice channel",
						description: "Unable to join your voice channel"
					})
				]
			});
		}

		if(sendReply) interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Join",
					description: `Joined \`${voice.channel.name}\` 🔊`
				})
			]
		});

		return queue;
	}
}