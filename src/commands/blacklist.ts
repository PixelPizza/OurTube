import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import {ApplicationCommandRegistry, CommandOptions} from "@sapphire/framework";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<CommandOptions>({
	description: "blacklist"
})
export class BlacklistCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
				.addUserOption(input => input.setName("user").setDescription("the user to blacklist").setRequired(true))
				.addStringOption(input =>
					input.setName("reason").setDescription("reason why for being blacklisted").setRequired(true)
				),
			{
				guildIds: ["863878432697614337"]
			}
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const user = interaction.options.getUser("user", true);
		const reason = interaction.options.getString("reason", true);

		await this.container.prisma.blacklist.create({
			data: {
				user: user.id,
				reason,
				author: interaction.user.id
			}
		});

		return interaction.editReply({
			embeds: [new MessageEmbed().setDescription("this user has been blacklisted")]
		});
	}
}
