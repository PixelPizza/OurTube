import {ApplyOptions} from "@sapphire/decorators";
import {stripIndents} from "common-tags";
import {MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "get the invite link of the bot"
})
export class InviteCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply({ephemeral: true});

		const {client} = interaction;
		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: await this.resolveCommandKey(interaction, "success.title"),
					description: stripIndents`
						[${await this.resolveCommandKey(interaction, "success.recommended")}](${client.generateInvite({
						scopes: ["bot", "applications.commands"]
					})})
						[${await this.resolveCommandKey(interaction, "success.admin")}](${client.generateInvite({
						scopes: ["bot", "applications.commands"],
						permissions: ["ADMINISTRATOR"]
					})})
					`
				})
			]
		});
	}
}
