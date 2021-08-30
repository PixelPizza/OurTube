import { CommandInteraction } from "discord.js";
import { SlashCommand, SlashCommandCheck } from "../command";

module.exports = class extends SlashCommandCheck {
	constructor(){
		super({
			title: "No voice channel",
			description: "I'm not connected to a voice channel"
		});
	}

	isValid(interaction: CommandInteraction, command: SlashCommand){
		return !command.botNeedsVoiceChannel || !!interaction.guild.me.voice.channel;
	}
}