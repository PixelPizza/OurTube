import { ApplicationCommandRegistry, Command, SapphireClient } from "@sapphire/framework";
import { vi } from "vitest";
import {
	ApplicationCommandType,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	ClientApplication,
	type Interaction,
	SnowflakeUtil,
	User
} from "discord.js";
import type {
	APIChatInputApplicationCommandInteraction,
	APIUser,
	APIApplicationCommandInteractionData,
	APIApplicationCommandAutocompleteInteraction,
	APIChatInputApplicationCommandInteractionData
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

	public mockAutocompleteInteraction(
		data: Omit<APIChatInputApplicationCommandInteractionData, "id" | "type">
	): AutocompleteInteraction {
		const interaction = Reflect.construct(AutocompleteInteraction, [
			this.#client,
			{
				id: this.generateSnowflake(),
				type: InteractionType.ApplicationCommandAutocomplete,
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
			} as APIApplicationCommandAutocompleteInteraction
		]);
		this.mockSharedInteractionMethods(interaction, {
			isAutocomplete: true
		});
		return interaction;
	}

	public mockCommandInteraction(
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
		this.mockSharedInteractionMethods(interaction, {
			isCommand: true,
			isChatInputCommand: true
		});
		return interaction;
	}

	public mockUser(): User {
		return Reflect.construct(User, [
			this.#client,
			{
				id: this.generateSnowflake()
			} as APIUser
		]);
	}

	public generateSnowflake(): string {
		return SnowflakeUtil.generate().toString();
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

	private mockSharedInteractionMethods(
		interaction: Interaction,
		options: Partial<{
			isButton: boolean;
			isAnySelectMenu: boolean;
			isAutocomplete: boolean;
			isCommand: boolean;
			isChatInputCommand: boolean;
			isChannelSelectMenu: boolean;
			isContextMenuCommand: boolean;
			isMentionableSelectMenu: boolean;
			isMessageComponent: boolean;
			isMessageContextMenuCommand: boolean;
			isModalSubmit: boolean;
			isRepliable: boolean;
			isRoleSelectMenu: boolean;
			isSelectMenu: boolean;
			isStringSelectMenu: boolean;
			isUserContextMenuCommand: boolean;
			isUserSelectMenu: boolean;
		}>
	) {
		options = Object.assign(
			{
				isButton: false,
				isAnySelectMenu: false,
				isAutocomplete: false,
				isCommand: false,
				isChatInputCommand: false,
				isChannelSelectMenu: false,
				isContextMenuCommand: false,
				isMentionableSelectMenu: false,
				isMessageComponent: false,
				isMessageContextMenuCommand: false,
				isModalSubmit: false,
				isRepliable: false,
				isRoleSelectMenu: false,
				isSelectMenu: false,
				isStringSelectMenu: false,
				isUserContextMenuCommand: false,
				isUserSelectMenu: false
			},
			options
		);
		Object.keys(options).forEach(key => {
			Reflect.set(
				interaction,
				key,
				vi.fn(() => options[key as keyof typeof options])
			);
		});
	}
}
