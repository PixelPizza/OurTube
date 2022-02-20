import { Precondition } from "@sapphire/framework";
import { CommandInteraction } from "discord.js";

export class BotInVoicePrecondition extends Precondition {
	public chatInputRun(interaction: CommandInteraction) {
		return interaction.guild.me.voice.channel ? this.ok() : this.error({message: this.container.getTranslation(interaction, "errors:botInVoice")});
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		BotInVoice: never;
	}
}