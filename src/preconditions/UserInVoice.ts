import {Precondition} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import type {CommandInteraction, GuildMember} from "discord.js";

export class UserInVoicePrecondition extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return (interaction.member as GuildMember).voice.channel
			? this.ok()
			: this.error({message: await resolveKey(interaction, "preconditions/userinvoice:error")});
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		UserInVoice: never;
	}
}
