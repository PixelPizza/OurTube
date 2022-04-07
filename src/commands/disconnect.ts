import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import {ApplicationCommandRegistry, Command, CommandOptions} from "@sapphire/framework";
import {CommandInteraction, MessageEmbed} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "let the bot disconnect from the currently joined voice channel",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class DisconnectCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder().setName(this.name).setDescription(this.description)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const {guild} = interaction;
		const {channel} = guild!.me!.voice;

		this.container.player.deleteQueue(guild!);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: this.container.getTranslation(interaction, "commands/disconnect:success.title"),
					description: this.container.getTranslation(interaction, "commands/disconnect:success.description", {
						replace: {channel: channel!.name}
					})
				})
			]
		});
	}
}
