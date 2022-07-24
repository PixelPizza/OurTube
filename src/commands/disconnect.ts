import {ApplyOptions} from "@sapphire/decorators";
import {MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "let the bot disconnect from the currently joined voice channel",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class DisconnectCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply();

		const {guild} = interaction;
		const {channel} = guild!.me!.voice;

		this.container.player.deleteQueue(guild!);

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: await this.resolveCommandKey(interaction, "success.title"),
					description: await this.resolveCommandKey(interaction, "success.description", {
						replace: {channel: channel!.name}
					})
				})
			]
		});
	}
}
