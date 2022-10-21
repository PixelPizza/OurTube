import {Precondition} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import type {CommandInteraction, GuildMember} from "discord.js";

export class InSameVoicePrecondition extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return interaction.guild!.members.me!.voice.channel!.equals((interaction.member as GuildMember).voice.channel!)
			? this.ok()
			: this.error({message: await resolveKey(interaction, "preconditions/insamevoice:error")});
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		InSameVoice: never;
	}
}
