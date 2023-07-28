import { container, ListenerStore } from "@sapphire/framework";
import { InteractionCreateListener } from "../../../../src";
import { DiscordMocker } from "../../../DiscordMocker";
import type {} from "@kaname-png/plugin-statcord/register";
import { Statcord } from "@kaname-png/plugin-statcord";
import { expect } from "vitest";

describe("InteractionCreateListener tests", () => {
	test("GIVEN non-command interaction THEN does nothing", async () => {
		container.statcord = new Statcord({
			key: "somekey"
		});
		const mocker = new DiscordMocker();
		const store = new ListenerStore();
		const listener = store.construct(InteractionCreateListener, {
			path: "",
			name: "interactionCreate",
			root: "",
			extension: ".js"
		});
		const interaction = mocker.mockAutocompleteInteraction({
			name: "noterror"
		});

		const result = await listener.run(interaction);
		expect(result).toBeUndefined();
	});

	test("GIVEN command interaction THEN posts message to statcord", async () => {
		container.statcord = new Statcord({
			key: "somekey"
		});
		container.statcord.postCommand = vi.fn(() => 0);
		const mocker = new DiscordMocker();
		const store = new ListenerStore();
		const listener = store.construct(InteractionCreateListener, {
			path: "",
			name: "commandDenied",
			root: "",
			extension: ".js"
		});
		const interaction = mocker.mockCommandInteraction({
			name: "error"
		});
		const spy = vi.spyOn(container.statcord, "postCommand");

		await listener.run(interaction);

		expect(spy).toHaveBeenCalledOnce();
		expect(spy).toHaveBeenCalledWith("error", interaction.user.id);
	});
});
