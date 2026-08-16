import { Command } from "@sapphire/framework";

export class PingCommand extends Command {
	public constructor(
		context: Command.LoaderContext,
		options: Command.Options
	) {
		super(context, {
			...options,
			name: "ping",
			description: "Replies with pong."
		});
	}

	public override registerApplicationCommands(
		registry: Command.Registry
	): void {
		registry.registerChatInputCommand(
			(builder) =>
				builder.setName(this.name).setDescription(this.description),
			{
				guildIds: process.env.DISCORD_GUILD_ID
					? [process.env.DISCORD_GUILD_ID]
					: undefined
			}
		);
	}

	public override chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	): Promise<unknown> {
		return interaction.reply({ content: "Pong!", ephemeral: false });
	}
}
