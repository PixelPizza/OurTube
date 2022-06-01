import {ApplyOptions} from "@sapphire/decorators";
import {Events, Listener} from "@sapphire/framework";
import type {Interaction, CacheType} from "discord.js";

@ApplyOptions<Listener.Options>({
	event: Events.InteractionCreate
})
export class InteractionCreateListener extends Listener<typeof Events.InteractionCreate> {
	public run(interaction: Interaction<CacheType>): unknown {
		if (!interaction.isCommand()) return;

		return this.container.statcord.postCommand(interaction.commandName, interaction.user.id);
	}
}
