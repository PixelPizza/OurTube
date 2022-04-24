import {ApplyOptions} from "@sapphire/decorators";
import {ChatInputCommandDeniedPayload, Listener, ListenerOptions, UserError} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import {MessageEmbed} from "discord.js";

@ApplyOptions<ListenerOptions>({
	event: "chatInputCommandDenied"
})
export class CommandDeniedListener extends Listener<"chatInputCommandDenied"> {
	public async run(error: UserError, {interaction}: ChatInputCommandDeniedPayload) {
		return interaction.reply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: await resolveKey<string>(interaction, "listeners/commanddenied:title"),
					description: error.message
				})
			]
		});
	}
}
