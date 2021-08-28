import { Interaction } from "discord.js";
import { ClientEvent, CustomClient } from "../client";
import { CustomConsole } from "../console";

module.exports = class extends ClientEvent {
	constructor(){
		super("interactionCreate");
	}

	async run(interaction: Interaction){
		if(!interaction.isCommand()) return;

		const command = (interaction.client as CustomClient<true>).commands.get(interaction.commandName);

		if(!command) return;

		if(command.defer) await interaction.deferReply({ephemeral: command.ephemeral});

		try {
			await command.run(interaction);
		} catch (error) {
			CustomConsole.log(error);
			await interaction.editReply({content: "There was an error while executing this command!", /*ephemeral: true*/});
		}
	}
}