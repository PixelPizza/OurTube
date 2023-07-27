import { Precondition } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";
import { resolveMaybeKey } from "../utils";

export class BotInVoicePrecondition extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return interaction.guild!.members.me!.voice.channel
			? this.ok()
			: this.error({
					message: await resolveMaybeKey(interaction, "preconditions/botinvoice:error")
			  });
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		BotInVoice: never;
	}
}
