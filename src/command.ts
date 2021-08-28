import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { CustomClient } from "./client";

abstract class SlashCommand {
	public readonly client: CustomClient<true>;
	public readonly data: SlashCommandBuilder //| Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
	public get global(){
		return this.data.defaultPermission;
	}
	public readonly defer: boolean;
	public readonly ephemeral: boolean;

	public constructor(client: CustomClient, data: SlashCommandBuilder, {defer = true, ephemeral = true} = {}){
		this.client = client;
		this.data = data;
		this.defer = defer;
		this.ephemeral = ephemeral;
	}

	public abstract run(interaction: CommandInteraction): void | Promise<void>;
}

export {SlashCommand};