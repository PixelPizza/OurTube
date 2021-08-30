import { CommandInteraction, GuildMember, Interaction, MessageEmbed } from "discord.js";
import { ClientEvent, CustomClient } from "../client";
import { CustomConsole } from "../console";

module.exports = class extends ClientEvent {
	constructor(){
		super("interactionCreate");
	}

	async run(interaction: Interaction){
		if(!interaction.isCommand()) return;

		const client = interaction.client as CustomClient<true>,
			command = client.commands.get(interaction.commandName);

		if(!command) return;

		//#region checks
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
		
		if(command.needsVoiceChannel && !(interaction.member as GuildMember).voice.channel)
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