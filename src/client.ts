import { Client, ClientEvents, Collection } from "discord.js";
import { SlashCommand } from "./command";

/**
 * An extended client class
 */
class CustomClient<Ready extends boolean = boolean> extends Client<Ready> {
	/**
	 * The commands of the client
	 */
	public readonly commands: Collection<string, SlashCommand> = new Collection();
}

/**
 * Base class for client events
 */
abstract class ClientEvent {
	/**
	 * The name of the event
	 */
	public readonly name: keyof ClientEvents;
	/**
	 * If this event should only be run once
	 */
	public readonly once: boolean;

	/**
	 * Make a new client event
	 * @param name The name of the event
	 * @param once If this event should only be run once
	 */
	public constructor(name: keyof ClientEvents, once?: boolean){
		this.name = name;
		this.once = once ?? false;
	}

	/**
	 * Run this event
	 */
	public abstract run(...args: unknown[]): void;
}

export {
	CustomClient,
	ClientEvent
};