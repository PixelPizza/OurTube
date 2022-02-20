import { Precondition } from "@sapphire/framework";
import { CommandInteraction, GuildMember } from "discord.js";

export class InSameVoicePrecondition extends Precondition {
	public chatInputRun(interaction: CommandInteraction) {
		return interaction.guild.me.voice.channel.equals((interaction.member as GuildMember).voice.channel) ?
			this.ok() :
			this.error({message: this.container.getTranslation(interaction, "errors:inSameVoice")});
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		InSameVoice: never;
	}
}