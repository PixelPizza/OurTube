import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { stripIndents } from "common-tags";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "get the invite link of the bot"
})
export class InviteCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(new SlashCommandBuilder().setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const {client} = interaction;
		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: "OurTube invite links",
					description: stripIndents`
						[Recommended](${client.generateInvite({
							scopes: ["bot", "applications.commands"]
						})})
						[Admin](${client.generateInvite({
							scopes: ["bot", "applications.commands"],
							permissions: ["ADMINISTRATOR"]
						})})
					`
				})
			]
		});
	}
}