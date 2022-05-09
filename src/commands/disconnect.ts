import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import type {ApplicationCommandRegistry, CommandOptions} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<CommandOptions>({
	description: "let the bot disconnect from the currently joined voice channel",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class DisconnectCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry): void {
		registry.registerChatInputCommand(
			new SlashCommandBuilder().setName(this.name).setDescription(this.description)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const {guild} = interaction;
		const {channel} = guild!.me!.voice;

		this.container.player.deleteQueue(guild!);

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: await resolveKey<string>(interaction, "commands/disconnect:success.title"),
					description: await resolveKey<string>(interaction, "commands/disconnect:success.description", {
						replace: {channel: channel!.name}
					})
				})
			]
		});
	}
}
