import {SlashCommand} from "discord-extend";
import {CommandInteraction, GuildMember, MessageEmbed} from "discord.js";
import {CustomClient} from "../client";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "join",
			description: "let the bot join your voice channel",
			checks: ["guildOnly", "userInVoice"]
		});
	}

	async run(interaction: CommandInteraction, sendReply: boolean = true) {
		if (sendReply) await interaction.deferReply();

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

		if (sendReply)
			interaction.editReply({
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
};
