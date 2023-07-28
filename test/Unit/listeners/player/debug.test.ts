import { container, ListenerStore, Logger, LogLevel } from "@sapphire/framework";
import { PlayerDebugListener } from "../../../../src";
import { GuildQueue } from "discord-player";
import { DiscordMocker } from "../../../DiscordMocker";
import { setContainerPlayer } from "../../../../src/container";

describe("DebugListener tests", () => {
	test("GIVEN debug message then logs debug message with debug level", () => {
		const mocker = new DiscordMocker();
		const { client } = mocker;
		setContainerPlayer(client);
		container.logger = new Logger(LogLevel.None);
		const store = new ListenerStore();
		const listener = store.construct(PlayerDebugListener, {
			path: "",
			name: "debug",
			root: "",
			extension: ".js"
		});
		const oldDebug = container.logger.debug.bind(container.logger);
		container.logger.debug = vi.fn(oldDebug);
		const spy = vi.spyOn(container.logger, "debug");
		const guild = mocker.mockGuild();
		const queue = new GuildQueue(container.player, {
			guild,
			bufferingTimeout: 0,
			disableHistory: false,
			connectionTimeout: 0,
			queueStrategy: "FIFO",
			equalizer: false,
			volume: 0,
			biquad: "BandPass",
			resampler: false,
			filterer: false,
			ffmpegFilters: [],
			skipOnNoStream: true,
			leaveOnEmpty: true,
			leaveOnEmptyCooldown: 0,
			leaveOnEnd: true,
			leaveOnEndCooldown: 0,
			leaveOnStop: true,
			leaveOnStopCooldown: 0,
			noEmitInsert: false,
			preferBridgedMetadata: false
		});

		listener.run(queue, "message");

		expect(spy).toHaveBeenCalledWith(`[${guild.name}] message`);
	});
});
