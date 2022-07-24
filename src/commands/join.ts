import {ApplyOptions} from "@sapphire/decorators";
import {GuildMember, MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "let the bot join your voice channel",
	preconditions: ["GuildOnly", "UserInVoice"],
	requiredClientPermissions: ["CONNECT"]
})
export class JoinCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description));
	}

	/**
	 * Join the voice channel of the interaction member
	 * @param interaction The interaction to get guild data from
	 * @returns The created queue of the interaction guild
	 */
	public async joinChannel(interaction: Command.ChatInputInteraction) {
		const {member, guild} = interaction;
		const {player} = this.container;
		const {voice} = member as GuildMember;

		const queue = player.createQueue(guild!, {
			leaveOnEmpty: false,
			leaveOnEnd: false,
			ytdlOptions: {
				quality: "highest",
				filter: "audioonly",
				highWaterMark: 1 << 25,
				dlChunkSize: 0
			},
			metadata: interaction
		});

		try {
			if (!queue.connection) await queue.connect(voice.channel!);
		} catch {
			player.deleteQueue(guild!);
			return void interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: await this.resolveCommandKey(interaction, "error.title"),
						description: await this.resolveCommandKey(interaction, "error.description")
					})
				]
			});
		}

		return queue;
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply();
		if (!(await this.joinChannel(interaction))) return;

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: await this.resolveCommandKey(interaction, "success.title"),
					description: await this.resolveCommandKey(interaction, "success.description", {
						replace: {channel: (interaction.member as GuildMember).voice.channel!.name}
					})
				})
			]
		});
	}
}
