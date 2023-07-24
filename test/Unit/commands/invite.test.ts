import {describe, expect, test} from "vitest";
import {DiscordMocker} from "../../DiscordMocker";
import {InviteCommand} from "../../../src/commands/invite";
import {CommandStore, container} from "@sapphire/framework";
import "@sapphire/plugin-i18next/register";
import {Colors, EmbedBuilder} from "discord.js";
import {stripIndents} from "common-tags";

describe("InviteCommand tests", () => {
	describe("chatInputRun tests", () => {
		test("MISSING TEST NAME", async () => {
			const mocker = new DiscordMocker();
			const {client} = mocker;
			const store = new CommandStore();
			const command = store.construct(InviteCommand, {
				name: "invite",
				path: "",
				root: "",
				extension: ".js"
			});
			const interaction = mocker.mockInteraction({
				name: "invite"
			});
			const spyDeferReply = vi.spyOn(interaction, "deferReply");
			const spyEditReply = vi.spyOn(interaction, "editReply");
			await container.i18n.init();

			await command.chatInputRun?.(interaction, {
				commandId: interaction.commandId,
				commandName: interaction.commandName
			});

			expect(spyDeferReply).toHaveBeenCalledWith({ephemeral: true});
			expect(spyEditReply).toHaveBeenCalledWith({
				embeds: [
					new EmbedBuilder({
						color: Colors.Blue,
						title: "OurTube invite links",
						description: stripIndents`
							[Recommended](https://discord.com/api/oauth2/authorize?client_id=${client.application?.id}&scope=bot+applications.commands)
							[Admin](https://discord.com/api/oauth2/authorize?client_id=${client.application?.id}&scope=bot+applications.commands&permissions=8)
						`
					})
				]
			});
		});
	});
});
