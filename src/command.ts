import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

type SlashCommandData = SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

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
	public readonly data: SlashCommandData;
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
	 * If the command can only be used in a guild
	 * @default false
	 */
	public readonly guildOnly: boolean;
	/**
	 * If the command needs the user to be in a voice channel
	 * @default false
	 */
	public readonly needsVoiceChannel: boolean;
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
	public constructor(data: SlashCommandData, {
		defer = true,
		ephemeral = true,
		guildOnly = false,
		needsVoiceChannel = false
	} = {}){
		this.data = data;
		this.defer = defer;
		this.ephemeral = ephemeral;
		this.guildOnly = guildOnly;
		this.needsVoiceChannel = needsVoiceChannel;
	}

	/**
	 * Run this command
	 */
	public abstract run(interaction: CommandInteraction): void | Promise<void>;
}

export {SlashCommand};