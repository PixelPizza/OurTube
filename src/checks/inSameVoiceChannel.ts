import { CommandInteraction, GuildMember } from "discord.js";
import { SlashCommand, SlashCommandCheck } from "../command";

module.exports = class extends SlashCommandCheck {
	constructor(){
		super({
			title: "Not in same voice channel",
			description: "You need to be in the same voice channel as me to use this command"
		});
	}

	isValid(interaction: CommandInteraction, command: SlashCommand){
		return !command.needsSameVoiceChannel ||
			(interaction.inGuild() && interaction.guild.me.voice.channel.equals((interaction.member as GuildMember).voice.channel));
	}
}