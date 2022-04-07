import {Precondition} from "@sapphire/framework";
import type {CommandInteraction, GuildMember} from "discord.js";

export class UserInVoicePrecondition extends Precondition {
	public chatInputRun(interaction: CommandInteraction) {
		return (interaction.member as GuildMember).voice.channel
			? this.ok()
			: this.error({message: this.container.getTranslation(interaction, "preconditions/userinvoice:error")});
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		UserInVoice: never;
	}
}
