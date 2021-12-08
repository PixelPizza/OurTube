import { Precondition } from "@sapphire/framework";
import { CommandInteraction, GuildMember } from "discord.js";

export class BotInVoicePrecondition extends Precondition {
	public chatInputRun(interaction: CommandInteraction) {
		return (interaction.member as GuildMember).voice.channel ?
			this.ok() : this.error({message: "I'm not connected to a voice channel"});
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		BotInVoice: never;
	}
}