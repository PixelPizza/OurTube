import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "let the bot disconnect from the currently joined voice channel"
})
export class DisconnectCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(new SlashCommandBuilder().setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const {guild} = interaction,
			{channel} = guild.me.voice;

		this.container.player.deleteQueue(guild);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Disconnect",
					description: `Disconnected from \`${channel.name}\` 🔊`
				})
			]
		});
	}
}