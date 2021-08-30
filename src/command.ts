import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, InteractionReplyOptions, MessageEmbed, MessageEmbedOptions } from "discord.js";

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
	 * 
	 * **Note:** Also sets guildOnly to true
	 * @default false
	 */
	public readonly needsVoiceChannel: boolean;
	/**
	 * If the command needs the user to be in the same voice channel as the bot
	 * 
	 * **Note:** Also sets guildOnly to true
	 * @default false
	 */
	public readonly needsSameVoiceChannel: boolean;
	/**
	 * If the bot needs to be in a voice channel to use this command
	 * 
	 * **Note:** Also sets guildOnly to true
	 * @default false
	 */
	public readonly botNeedsVoiceChannel: boolean;
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
		needsVoiceChannel = false,
		needsSameVoiceChannel = false,
		botNeedsVoiceChannel = false
	} = {}){
		this.data = data;
		this.defer = defer;
		this.ephemeral = ephemeral;
		this.guildOnly = needsVoiceChannel || needsSameVoiceChannel || botNeedsVoiceChannel || guildOnly;
		this.needsVoiceChannel = needsVoiceChannel;
		this.needsSameVoiceChannel = needsSameVoiceChannel;
		this.botNeedsVoiceChannel = botNeedsVoiceChannel;
	}

	/**
	 * Run this command
	 */
	public abstract run(interaction: CommandInteraction, ...args: any[]): any;
}

/**
 * Base class for command checks
 */
abstract class SlashCommandCheck {
	private readonly _reply: Omit<MessageEmbedOptions, "color">;
	/**
	 * The reply to send if invalid
	 */
	public get reply(): InteractionReplyOptions {
		return {
			embeds: [new MessageEmbed(Object.assign(this._reply, {color: "RED"}) as MessageEmbedOptions)],
			ephemeral: true
		};
	}
	public readonly index: number;

	/**
	 * Make a new command check
	 * @param reply The reply to send if invalid
	 */
	constructor(reply: Omit<MessageEmbedOptions, "color">, index: number){
		this._reply = reply;
		this.index = index;
	}

	/**
	 * Check if valid
	 */
	public abstract isValid(interaction: CommandInteraction, command: SlashCommand): boolean;
}

export {
	SlashCommand,
	SlashCommandCheck
};