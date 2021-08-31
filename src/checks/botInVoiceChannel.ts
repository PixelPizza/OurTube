import { CommandInteraction } from "discord.js";
import { CustomSlashCommand, SlashCommandCheck } from "../command";

module.exports = class extends SlashCommandCheck {
	constructor(){
		super({
			title: "No voice channel",
			description: "I'm not connected to a voice channel"
		}, 2);
	}

	isValid(interaction: CommandInteraction, command: CustomSlashCommand){
		return !command.botNeedsVoiceChannel || !!interaction.guild.me.voice.channel;
	}
}