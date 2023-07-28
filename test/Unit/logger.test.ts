import { Logger, parseEnv } from "../../src";
import { container, LogLevel } from "@sapphire/framework";
import type { APIEmbed, APIMessage, JSONEncodable, WebhookClient, WebhookMessageCreateOptions } from "discord.js";
import { EmbedBuilder, MessageType } from "discord.js";
import { DiscordMocker } from "../DiscordMocker";
import type { APIUser } from "discord-api-types/v10";
import { config } from "dotenv";
import { expect } from "vitest";
config();

container.env = parseEnv();

describe("Logger tests", () => {
	test("GIVEN info log THEN level is info", () => {
		const mocker = new DiscordMocker();
		const logger = new Logger(container);
		const oldWrite = logger.write.bind(logger);
		logger.write = vi.fn(oldWrite);
		const webhook: WebhookClient = Reflect.get(logger, "webhook");
		const mockMessage: APIMessage = {
			id: mocker.generateSnowflake(),
			type: MessageType.Default,
			channel_id: mocker.generateSnowflake(),
			author: mocker.mockUser().toJSON() as APIUser,
			content: "test",
			timestamp: mocker.generateSnowflake(),
			edited_timestamp: mocker.generateSnowflake(),
			tts: false,
			mention_everyone: false,
			mentions: [],
			mention_roles: [],
			attachments: [],
			embeds: [],
			pinned: false
		};
		webhook.send = vi.fn(() => Promise.resolve(mockMessage));
		const spy = vi.spyOn(logger, "write");

		logger.info("test");

		expect(spy).toHaveBeenCalledWith(LogLevel.Info, "test");
	});

	test("GIVEN info log THEN webhook sends correct message", () => {
		const mocker = new DiscordMocker();
		const logger = new Logger(container);
		const oldWrite = logger.write.bind(logger);
		logger.write = vi.fn(oldWrite);
		const webhook: WebhookClient = Reflect.get(logger, "webhook");
		const mockMessage: APIMessage = {
			id: mocker.generateSnowflake(),
			type: MessageType.Default,
			channel_id: mocker.generateSnowflake(),
			author: mocker.mockUser().toJSON() as APIUser,
			content: "test",
			timestamp: mocker.generateSnowflake(),
			edited_timestamp: mocker.generateSnowflake(),
			tts: false,
			mention_everyone: false,
			mentions: [],
			mention_roles: [],
			attachments: [],
			embeds: [],
			pinned: false
		};
		webhook.send = vi.fn(() => Promise.resolve(mockMessage));
		const spy = vi.spyOn(webhook, "send");

		logger.info("test");

		expect(spy).toHaveBeenCalledOnce();
		expect(spy).toHaveBeenCalledWith({
			embeds: [
				new EmbedBuilder()
					.setColor("#00ffff")
					.setTitle("Info")
					.setDescription("test")
					.setTimestamp(
						new Date(
							(
								(spy.mock.lastCall?.[0] as WebhookMessageCreateOptions)
									.embeds?.[0] as JSONEncodable<APIEmbed>
							).toJSON().timestamp!
						)
					)
			],
			username: "OurTube Console",
			avatarURL: undefined
		});
	});
});
