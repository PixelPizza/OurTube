import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { CustomClient } from "./client";

abstract class SlashCommand {
	public readonly data: SlashCommandBuilder //| Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
	public get global(){
		return this.data.defaultPermission;
	}
	public readonly defer: boolean;
	public readonly ephemeral: boolean;

	public constructor(data: SlashCommandBuilder, {defer = true, ephemeral = true} = {}){
		this.data = data;
		this.defer = defer;
		this.ephemeral = ephemeral;
	}

	public abstract run(interaction: CommandInteraction): void | Promise<void>;
}

export {SlashCommand};