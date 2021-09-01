import { ClientEvents, ClientOptions, Collection, CommandInteraction } from "discord.js";
import {Client} from "discord-extend";
import { CustomSlashCommand, SlashCommandCheck } from "./command";
import { CustomPlayer } from "./player";
import { Util } from "./util";

type CustomClientEvents = ClientEvents & {command: [interaction: CommandInteraction, command: CustomSlashCommand]};

/**
 * An extended client class
 */
class CustomClient<Ready extends boolean = boolean> extends Client<Ready> {
	/**
	 * The commands of the client
	 */
	public readonly commands: Collection<string, CustomSlashCommand> = new Collection();
	/**
	 * The player used to play songs
	 */
	public readonly player: CustomPlayer;

	constructor(options: ClientOptions){
		super(options);
		this.player = new CustomPlayer(this);

		Util.getJSFiles("checks", (checks: SlashCommandCheck[]) => {
			this.on("interactionCreate", interaction => {
				if(!interaction.isCommand()) return;

				const command = this.commands.get(interaction.commandName);

				if(!command) return;

				for(const check of checks.sort((first, second) => first.index - second.index))
					if(!check.isValid(interaction, command)) return interaction.reply(check.reply);

				this.emit("command", interaction, command);
			});
		});
	}
}

export {
	CustomClient,
	CustomClientEvents
};