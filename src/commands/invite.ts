import {stripIndents} from "common-tags";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {CustomSlashCommand} from "../command";

module.exports = class extends CustomSlashCommand {
	constructor() {
		super({
			name: "invite",
			description: "get the invite link of the bot"
		});
	}

	run(interaction: CommandInteraction) {
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
