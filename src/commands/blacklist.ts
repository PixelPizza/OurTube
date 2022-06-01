import {ApplyOptions} from "@sapphire/decorators";
import {MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "blacklist"
})
export class BlacklistCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(
			this.defaultChatInputCommand
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

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply();

		switch (interaction.options.getSubcommand(true)) {
			case "add":
				return this.chatInputAdd(interaction);
			case "remove":
				return this.chatInputRemove(interaction);
		}
	}

	public async chatInputAdd(interaction: Command.ChatInputInteraction): Promise<any> {
		const user = interaction.options.getUser("user", true);
		const reason = interaction.options.getString("reason", true);

		if (await this.container.prisma.blacklist.findUnique({where: {user: user.id}})) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setTitle(await this.resolveCommandKey(interaction, "add.error.title"))
						.setDescription(
							await this.resolveCommandKey(interaction, "add.error.description", {
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
					.setTitle(await this.resolveCommandKey(interaction, "add.success.title"))
					.setDescription(
						await this.resolveCommandKey(interaction, "add.success.description", {
							replace: {
								user: user.toString()
							}
						})
					)
			]
		});
	}

	public async chatInputRemove(interaction: Command.ChatInputInteraction): Promise<any> {
		const user = interaction.options.getUser("user", true);

		if (!(await this.container.prisma.blacklist.findUnique({where: {user: user.id}}))) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setTitle(await this.resolveCommandKey(interaction, "remove.error.title"))
						.setDescription(
							await this.resolveCommandKey(interaction, "remove.error.description", {
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
					.setTitle(await this.resolveCommandKey(interaction, "remove.success.title"))
					.setDescription(
						await this.resolveCommandKey(interaction, "remove.success.description", {
							replace: {
								user: user.toString()
							}
						})
					)
			]
		});
	}
}
