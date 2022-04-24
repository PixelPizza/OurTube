import {Precondition} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import type {CommandInteraction} from "discord.js";

export class BotInVoicePrecondition extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return interaction.guild!.me!.voice.channel
			? this.ok()
			: this.error({message: await resolveKey(interaction, "preconditions/botinvoice:error")});
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		BotInVoice: never;
	}
}
