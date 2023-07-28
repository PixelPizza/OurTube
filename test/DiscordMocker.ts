import { ApplicationCommandRegistry, Command, SapphireClient } from "@sapphire/framework";
import { vi } from "vitest";
import {
	ApplicationCommandType,
	ChatInputCommandInteraction,
	ClientApplication,
	SnowflakeUtil,
	User
} from "discord.js";
import type {
	APIChatInputApplicationCommandInteraction,
	APIUser,
	APIApplicationCommandInteractionData
} from "discord-api-types/v10";
import { ChannelType, InteractionType } from "discord-api-types/v10";
import type { RawClientApplicationData } from "discord.js/typings/rawDataTypes";

export class DiscordMocker {
	readonly #client: SapphireClient;

	public constructor() {
		this.#client = this.mockClient();
	}

	public get client() {
		return this.#client;
	}

	public mockCommandRegistry(command: Command) {
		const registry = new ApplicationCommandRegistry(command.name);
		Object.defineProperty(registry, "command", {
			get: vi.fn(() => command)
		});
		const oldRegisterChatInputCommand = registry.registerChatInputCommand.bind(registry);
		registry.registerChatInputCommand = vi.fn((command, options) => oldRegisterChatInputCommand(command, options));
		const oldRegisterContextMenuCommand = registry.registerContextMenuCommand.bind(registry);
		registry.registerContextMenuCommand = vi.fn((command, options) =>
			oldRegisterContextMenuCommand(command, options)
		);
		return registry;
	}

	public mockInteraction(
		data: Omit<APIApplicationCommandInteractionData, "id" | "type">
	): ChatInputCommandInteraction {
		const interaction = Reflect.construct(ChatInputCommandInteraction, [
			this.#client,
			{
				id: this.generateSnowflake(),
				type: InteractionType.ApplicationCommand,
				version: 1,
				token: "",
				channel: {
					id: this.generateSnowflake(),
					type: ChannelType.GuildText,
					name: "test-channel",
					position: 0
				},
				data: {
					...data,
					id: this.generateSnowflake(),
					type: ApplicationCommandType.ChatInput
				},
				application_id: this.generateSnowflake(),
				locale: "en-US",
				user: this.mockUser().toJSON()
			} as APIChatInputApplicationCommandInteraction
		]);
		interaction.deferReply = vi.fn();
		interaction.reply = vi.fn();
		interaction.editReply = vi.fn();
		interaction.isCommand = vi.fn(() => true);
		return interaction;
	}

	private mockClient(): SapphireClient {
		const client = new SapphireClient({
			intents: [],
			rest: {
				handlerSweepInterval: 0,
				hashSweepInterval: 0
			}
		});
		client.application = Reflect.construct(ClientApplication, [
			client,
			{
				id: this.generateSnowflake()
			} as RawClientApplicationData
		]);
		client.login = vi.fn(() => Promise.resolve("DISCORD_TOKEN"));
		return client;
	}

	private mockUser(): User {
		return Reflect.construct(User, [
			this.#client,
			{
				id: this.generateSnowflake()
			} as APIUser
		]);
	}

	private generateSnowflake(): string {
		return SnowflakeUtil.generate().toString();
	}
}
