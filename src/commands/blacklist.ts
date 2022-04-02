import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "blacklist",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class BlacklistCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
				.addUserOption((input) => input
					.setName("user")
					.setDescription("the user to blacklist")
					.setRequired(true))
				.addStringOption((input) => input
					.setName("reason")
					.setDescription("reason why for being blacklisted")
					.setRequired(true)),
			{
				guildIds: ["863878432697614337"]
			}
		);
	}
                        
	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const reason = interaction.options.getString("reason");
		const user = interaction.options.getUser("user");

		await this.container.prisma.blacklist.create({
            data: {
                user: user.id,
                reason,
                author: interaction.user.id
            }
        });
	}
}
