import {ApplyOptions} from "@sapphire/decorators";
import {MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "get the invite link of the support server"
})
export class SupportCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply({ephemeral: true});

		const guild = await interaction.client.guilds.fetch(process.env.GUILD);
		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: await this.resolveCommandKey(interaction, "success.title"),
					description: await this.resolveCommandKey(interaction, "success.description", {
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
