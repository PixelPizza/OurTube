import { PlayerEvents } from "discord-player";
import { Awaited, ClientEvents } from "discord.js";

/**
 * Base class for events
 */
abstract class OTEvent<Name extends string> {
	/**
	 * The name of the event
	 */
	public readonly name: Name;
	/**
	 * If this event should only be run once
	 */
	public readonly once: boolean;


	/**
	 * Make a new ourtube event
	 * @param name The name of the event
	 * @param once If this event should only be run once
	 */
	public constructor(name: Name, once: boolean = false){
		this.name = name;
		this.once = once;
	}

	/**
	 * Run this event
	 */
	public abstract run(...args: unknown[]): unknown;
}

/**
 * Base class for client events
 */
abstract class ClientEvent<K extends keyof ClientEvents = keyof ClientEvents> extends OTEvent<K> {
	public abstract run(...args: ClientEvents[K]): Awaited<void>;
}

/**
 * Base class for player events
 */
abstract class PlayerEvent<K extends keyof PlayerEvents = keyof PlayerEvents> extends OTEvent<K> {
	public abstract run: PlayerEvents[K];
}

export {
	ClientEvent,
	PlayerEvent
};