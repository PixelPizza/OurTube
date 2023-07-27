import { Precondition } from "@sapphire/framework";
import type { CommandInteraction, GuildMember } from "discord.js";
import { resolveMaybeKey } from "../utils";

export class InSameVoicePrecondition extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return interaction.guild!.members.me!.voice.channel!.equals((interaction.member as GuildMember).voice.channel!)
			? this.ok()
			: this.error({
					message: await resolveMaybeKey(interaction, "preconditions/insamevoice:error")
			  });
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		InSameVoice: never;
	}
}
