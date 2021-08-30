import { CommandInteraction, GuildMember, Interaction, MessageEmbed, MessageEmbedOptions } from "discord.js";
import { CustomClient } from "../../client";
import { SlashCommand } from "../../command";
import { CustomConsole } from "../../console";
import { ClientEvent } from "../../event";

module.exports = class extends ClientEvent {
	constructor(){
		super("interactionCreate");
	}

	checks: {
		fn: (interaction: CommandInteraction, command: SlashCommand) => boolean;
		reply: Omit<MessageEmbedOptions, "color">;
	}[] = [
		{
			fn(interaction, command){
				return command.guildOnly && !interaction.inGuild();
			},
			reply: {
				title: "Guild Only",
				description: "This command can only be used in a guild"
			}
		}
	];

	async run(interaction: Interaction){
		if(!interaction.isCommand()) return;

		const client = interaction.client as CustomClient<true>,
			command = client.commands.get(interaction.commandName);

		if(!command) return;

		//#region misc checks
		if(command.guildOnly && !interaction.inGuild())
			return (interaction as CommandInteraction).reply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Guild only",
						description: "This command can only be used in a guild"
					})
				],
				ephemeral: true
			});
		//#endregion
		
		//#region voice channel checks
		const voiceChannel = (interaction.member as GuildMember).voice.channel;

		if(command.needsVoiceChannel && !voiceChannel)
			return interaction.reply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Voice channel not found",
						description: "You need to join a voice channel to use this command"
					})
				],
				ephemeral: true
			});

		if(command.needsSameVoiceChannel && !interaction.guild.me.voice.channel?.equals(voiceChannel))
			return interaction.reply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Not in voice channel",
						description: "You need to be in the same voice channel as me to use this command"
					})
				],
				ephemeral: true
			});
		//#endregion

		if(command.defer) await interaction.deferReply({ephemeral: command.ephemeral});

		try {
			await command.run(interaction);
		} catch (error) {
			CustomConsole.log(error);
			await interaction.editReply({content: "There was an error while executing this command!", /*ephemeral: true*/});
		}
	}
}