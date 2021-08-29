import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

/**
 * Base class for commands
 */
abstract class SlashCommand {
	/**
	 * The data of the command
	 * * name
	 * * description
	 * * default permission
	 * * options
	*/
	public readonly data: SlashCommandBuilder //| Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
	/**
	 * If the command defers the reply before being run
	 * @default true
	 */
	public readonly defer: boolean;
	/**
	 * If only the user that ran the command can see the reply
	 * @default true
	 */
	public readonly ephemeral: boolean;
	/**
	 * If the command is a global command
	 * 
	 * **Note:** This value is always the same as the defaultPermission of the command
	 * @default true
	 */
	public get global(){
		return this.data.defaultPermission ?? true;
	}

	/**
	 * Make a new slash command
	 * @param data The data of the command
	 * @param options Options for the command
	 */
	public constructor(data: SlashCommandBuilder, {defer = true, ephemeral = true} = {}){
		this.data = data;
		this.defer = defer;
		this.ephemeral = ephemeral;
	}

	/**
	 * Run this command
	 */
	public abstract run(interaction: CommandInteraction): void | Promise<void>;
}

export {SlashCommand};