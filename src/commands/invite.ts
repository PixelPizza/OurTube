import {stripIndents} from "common-tags";
import { SlashCommand } from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "invite",
			description: "get the invite link of the bot"
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const {client} = interaction;
		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: "OurTube invite links",
					description: stripIndents`
						[Recommended](${client.generateInvite({
							scopes: ["bot", "applications.commands"]
						})})
						[Admin](${client.generateInvite({
							scopes: ["bot", "applications.commands"],
							permissions: ["ADMINISTRATOR"]
						})})
					`
				})
			]
		});
	}
};
