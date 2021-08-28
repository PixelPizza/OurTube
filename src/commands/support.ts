import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { SlashCommand } from "../command";

module.exports = class extends SlashCommand {
	constructor(){
		super(new SlashCommandBuilder()
			.setName("support")
			.setDescription("get the invite link of the support server"))
	}

	async run(interaction: CommandInteraction){
		const guild = await interaction.client.guilds.fetch(process.env.GUILD);
		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "Support",
					description: `Here is the invite for the [support server](${await guild.invites.create(guild.systemChannel, {
						maxAge: 0,
						reason: `${interaction.user} used the support command`
					})})`
				})
			]
		});
	}
}