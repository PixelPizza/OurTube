import { Precondition } from "@sapphire/framework";
import type { CommandInteraction, GuildMember } from "discord.js";
import { resolveMaybeKey } from "../utils";

export class UserInVoicePrecondition extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return (interaction.member as GuildMember).voice.channel
			? this.ok()
			: this.error({
					message: await resolveMaybeKey(interaction, "preconditions/userinvoice:error")
			  });
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		UserInVoice: never;
	}
}
