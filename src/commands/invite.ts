import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import {ApplicationCommandRegistry, CommandOptions} from "@sapphire/framework";
import {stripIndents} from "common-tags";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<CommandOptions>({
	description: "get the invite link of the bot"
})
export class InviteCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder().setName(this.name).setDescription(this.description)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const {client} = interaction;
		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: this.container.getTranslation(interaction, "commands/invite:success.title"),
					description: stripIndents`
						[${this.container.getTranslation(interaction, "commands/invite:success.recommended")}](${client.generateInvite({
						scopes: ["bot", "applications.commands"]
					})})
						[${this.container.getTranslation(interaction, "commands/invite:success.admin")}](${client.generateInvite({
						scopes: ["bot", "applications.commands"],
						permissions: ["ADMINISTRATOR"]
					})})
					`
				})
			]
		});
	}
}
