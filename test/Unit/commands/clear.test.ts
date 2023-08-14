import { DiscordMocker } from "../../DiscordMocker";
import { CommandStore } from "@sapphire/framework";
import { ClearCommand } from "../../../src";

describe("ClearCommand tests", () => {
	describe("registerApplicationCommands tests", () => {
		test("Command registers a single chat input command", async () => {
			const mocker = new DiscordMocker();
			const store = new CommandStore();
			const command = store.construct(ClearCommand, {
				name: "clear",
				path: "",
				root: "",
				extension: ".js"
			});
			const registry = mocker.mockCommandRegistry(command);
			const spyRegisterChatInputCommand = vi.spyOn(registry, "registerChatInputCommand");

			await command.registerApplicationCommands?.(registry);

			expect(spyRegisterChatInputCommand).toHaveBeenCalledOnce();
			expect(spyRegisterChatInputCommand).toHaveBeenCalledWith(expect.any(Function));
			expect(registry.chatInputCommands).toStrictEqual(new Set(["clear"]));
		});
	});
});
