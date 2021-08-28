import { Client, ClientEvents, Collection } from "discord.js";
import { SlashCommand } from "./command";

class CustomClient<Ready extends boolean = boolean> extends Client<Ready> {
	public readonly commands: Collection<string, SlashCommand> = new Collection();
}

abstract class ClientEvent {
	public readonly client: CustomClient;
	public readonly name: keyof ClientEvents;
	public readonly once: boolean;

	public constructor(client: CustomClient, name: keyof ClientEvents, once?: boolean){
		this.client = client;
		this.name = name;
		this.once = once ?? false;
	}

	public abstract run(...args: unknown[]): void;
}

export {
	CustomClient,
	ClientEvent
};