import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import {ApplicationCommandRegistry, CommandOptions, Command} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import {CommandInteraction, MessageEmbed} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "blacklist"
})
export class BlacklistCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry): void {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
				.addSubcommand(input =>
					input
						.setName("add")
						.setDescription("Add a user to the blacklist")
						.addUserOption(input =>
							input.setName("user").setDescription("the user to blacklist").setRequired(true)
						)
						.addStringOption(input =>
							input.setName("reason").setDescription("reason why for being blacklisted").setRequired(true)
						)
				)
				.addSubcommand(input =>
					input
						.setName("remove")
						.setDescription("Remove a user from the blacklist")
						.addUserOption(input =>
							input.setName("user").setDescription("the user to unblacklist").setRequired(true)
						)
				),
			{
				guildIds: ["863878432697614337"],
				idHints: ["960218037863215195"]
			}
		);
	}

	public async chatInputRun(interaction: CommandInteraction): Promise<any> {
		await interaction.deferReply();

		switch (interaction.options.getSubcommand(true)) {
			case "add":
				return this.chatInputAdd(interaction);
			case "remove":
				return this.chatInputRemove(interaction);
		}
	}

	public async chatInputAdd(interaction: CommandInteraction) {
		const user = interaction.options.getUser("user", true);
		const reason = interaction.options.getString("reason", true);

		if (await this.container.prisma.blacklist.findUnique({where: {user: user.id}})) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setTitle(await resolveKey(interaction, "commands/blacklist:add.error.title"))
						.setDescription(
							await resolveKey(interaction, "commands/blacklist:add.error.description", {
								replace: {
									user: user.toString()
								}
							})
						)
				]
			});
		}

		await this.container.prisma.blacklist.create({
			data: {
				user: user.id,
				reason,
				author: interaction.user.id
			}
		});

		return interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setColor("GREEN")
					.setTitle(await resolveKey(interaction, "commands/blacklist:add.success.title"))
					.setDescription(
						await resolveKey(interaction, "commands/blacklist:add.success.description", {
							replace: {
								user: user.toString()
							}
						})
					)
			]
		});
	}

	public async chatInputRemove(interaction: CommandInteraction) {
		const user = interaction.options.getUser("user", true);

		if (!(await this.container.prisma.blacklist.findUnique({where: {user: user.id}}))) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setTitle(await resolveKey(interaction, "commands/blacklist:remove.error.title"))
						.setDescription(
							await resolveKey(interaction, "commands/blacklist:remove.error.description", {
								replace: {
									user: user.toString()
								}
							})
						)
				]
			});
		}

		await this.container.prisma.blacklist.delete({
			where: {
				user: user.id
			}
		});

		return interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setColor("GREEN")
					.setTitle(await resolveKey(interaction, "commands/blacklist:remove.success.title"))
					.setDescription(
						await resolveKey(interaction, "commands/blacklist:remove.success.description", {
							replace: {
								user: user.toString()
							}
						})
					)
			]
		});
	}
}
