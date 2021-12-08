import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "get the invite link of the support server"
})
export class SupportCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(new SlashCommandBuilder().setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const guild = await interaction.client.guilds.fetch(process.env.GUILD);
		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "Support",
					description: `Here is the invite for the [support server](${await guild.invites.create(
						guild.systemChannel,
						{
							maxAge: 0,
							reason: `${interaction.user} used the support command`
						}
					)})`
				})
			]
		});
	}
}