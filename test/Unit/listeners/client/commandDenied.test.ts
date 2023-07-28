import { container, ListenerStore, UserError } from "@sapphire/framework";
import { CommandDeniedListener } from "../../../../src";
import { DiscordMocker } from "../../../DiscordMocker";
import { Colors, EmbedBuilder } from "discord.js";
import "@sapphire/plugin-i18next/register";

describe("CommandDeniedListener tests", () => {
	test("GIVEN error THEN replies to interaction with error message", async () => {
		const mocker = new DiscordMocker();
		const store = new ListenerStore();
		const listener = store.construct(CommandDeniedListener, {
			path: "",
			name: "commandDenied",
			root: "",
			extension: ".js"
		});
		const interaction = mocker.mockCommandInteraction({
			name: "error"
		});
		const error = new UserError({
			identifier: "error",
			message: "error"
		});
		const spy = vi.spyOn(interaction, "reply");
		await container.i18n.init();

		await listener.run(error, { interaction });

		expect(spy).toHaveBeenCalledWith({
			embeds: [new EmbedBuilder().setColor(Colors.Red).setTitle("Command Failed").setDescription("error")]
		});
	});
});
