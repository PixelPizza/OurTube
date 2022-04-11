import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import type {ApplicationCommandRegistry, CommandOptions} from "@sapphire/framework";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<CommandOptions>({
	description: "get the invite link of the support server"
})
export class SupportCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry): void  {
		registry.registerChatInputCommand(
			new SlashCommandBuilder().setName(this.name).setDescription(this.description)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const guild = await interaction.client.guilds.fetch(process.env.GUILD);
		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: this.container.getTranslation(interaction, "commands/support:success.title"),
					description: this.container.getTranslation(interaction, "commands/support:success.description", {
						replace: {
							invite: (
								await guild.invites.create(guild.systemChannel!, {
									maxAge: 0,
									reason: `${interaction.user} used the support command`
								})
							).url
						}
					})
				})
			]
		});
	}
}
