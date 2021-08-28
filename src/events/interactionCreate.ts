import { Interaction } from "discord.js";
import { ClientEvent, CustomClient } from "../client";
import { CustomConsole } from "../console";

module.exports = class extends ClientEvent {
	constructor(client: CustomClient){
		super(client, "interactionCreate");
	}

	async run(interaction: Interaction){
		if(!interaction.isCommand()) return;

		const command = (interaction.client as CustomClient<true>).commands.get(interaction.commandName);

		if(!command) return;

		try {
			if(command.defer) await interaction.deferReply({ephemeral: command.ephemeral});
			await command.run(interaction);
		} catch (error) {
			CustomConsole.log(error);
			await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
		}
	}
}