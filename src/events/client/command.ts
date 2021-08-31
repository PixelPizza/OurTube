import { CommandInteraction } from "discord.js";
import { CustomSlashCommand } from "../../command";
import { CustomConsole } from "../../console";
import { ClientEvent } from "../../event";

module.exports = class extends ClientEvent<"command"> {
	constructor(){
		super("command");
	}

	async run(interaction: CommandInteraction, command: CustomSlashCommand){
		if(command.defer) await interaction.deferReply({ephemeral: command.ephemeral});

		try {
			await command.run(interaction);
		} catch (error) {
			CustomConsole.log(error);
			await interaction.editReply({content: "There was an error while executing this command!", /*ephemeral: true*/});
		}
	}
}