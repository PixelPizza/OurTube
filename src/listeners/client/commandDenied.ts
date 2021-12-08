import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommandDeniedPayload, Listener, ListenerOptions, UserError } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";

@ApplyOptions<ListenerOptions>({
	event: "chatInputCommandDenied"
})
export class CommandDeniedListener extends Listener<"chatInputCommandDenied"> {
	run(error: UserError, {interaction}: ChatInputCommandDeniedPayload) {
		return interaction.reply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "Command Failed",
					description: error.message
				})
			]
		});
	}
}