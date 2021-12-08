import { Precondition } from "@sapphire/framework";
import { CommandInteraction, GuildMember } from "discord.js";

export class InSameVoicePrecondition extends Precondition {
	public chatInputRun(interaction: CommandInteraction) {
		return interaction.guild.me.voice.channel.equals((interaction.member as GuildMember).voice.channel) ?
			this.ok() :
			this.error({message: "You need to be in the same voice channel as me to use this command"});
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		InSameVoice: never;
	}
}