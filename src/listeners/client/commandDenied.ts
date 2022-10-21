import {ApplyOptions} from "@sapphire/decorators";
import {ChatInputCommandDeniedPayload, Listener, UserError} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import {EmbedBuilder, Colors} from "discord.js";

@ApplyOptions<Listener.Options>({
	event: "chatInputCommandDenied"
})
export class CommandDeniedListener extends Listener<"chatInputCommandDenied"> {
	public async run(error: UserError, {interaction}: ChatInputCommandDeniedPayload) {
		return interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Red)
					.setTitle(await resolveKey(interaction, "listeners/commanddenied:title"))
					.setDescription(error.message)
			]
		});
	}
}
