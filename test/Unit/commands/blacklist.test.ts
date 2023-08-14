import { DiscordMocker } from "../../DiscordMocker";
import { CommandStore } from "@sapphire/framework";
import { BlacklistCommand } from "../../../src";

describe("BlacklistCommand tests", () => {
	describe("registerApplicationCommands tests", () => {
		test("Command registers a single chat input command", async () => {
			const mocker = new DiscordMocker();
			const store = new CommandStore();
			const command = store.construct(BlacklistCommand, {
				name: "blacklist",
				path: "",
				root: "",
				extension: ".js"
			});
			const registry = mocker.mockCommandRegistry(command);
			const spyRegisterChatInputCommand = vi.spyOn(registry, "registerChatInputCommand");

			await command.registerApplicationCommands?.(registry);

			expect(spyRegisterChatInputCommand).toHaveBeenCalledOnce();
			expect(spyRegisterChatInputCommand).toHaveBeenCalledWith(expect.any(Function), expect.any(Object));
			expect(registry.chatInputCommands).toStrictEqual(new Set(["blacklist", expect.any(String)]));
		});
	});

	describe("chatInputRun tests", () => {
		test("blablabla These tests are dumb", async () => {
			const mocker = new DiscordMocker();
			const store = new CommandStore();
			const command = store.construct(BlacklistCommand, {
				name: "blacklist",
				path: "",
				root: "",
				extension: ".js"
			}) as BlacklistCommand;
			command.chatInputAdd = () => Promise.resolve();
			command.chatInputRemove = () => Promise.resolve();
			const interaction = mocker.mockCommandInteraction({
				name: "blacklist"
			});
			const spyDeferReply = vi.spyOn(interaction, "deferReply");

			interaction.options.getSubcommand = () => "add";
			await command.chatInputRun(interaction);

			interaction.options.getSubcommand = () => "remove";
			await command.chatInputRun(interaction);

			expect(spyDeferReply).toHaveBeenCalledTimes(2);
			expect(spyDeferReply).toHaveBeenCalledWith();
		});
	});
});
