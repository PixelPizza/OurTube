import { PlayerEvents } from "discord-player";
import { ClientEvents } from "discord.js";

/**
 * Base class for events
 */
abstract class OTEvent {
	/**
	 * The name of the event
	 */
	public readonly name: string;
	/**
	 * If this event should only be run once
	 */
	public readonly once: boolean;


	/**
	 * Make a new ourtube event
	 * @param name The name of the event
	 * @param once If this event should only be run once
	 */
	public constructor(name: string, once: boolean = false){
		this.name = name;
		this.once = once;
	}

	/**
	 * Run this event
	 */
	public abstract run(...args: unknown[]): void;
}

/**
 * Base class for client events
 */
abstract class ClientEvent extends OTEvent {
	/**
	 * The name of the event
	 */
	declare public readonly name: keyof ClientEvents;

	/**
	 * Make a new client event
	 * @param name The name of the event
	 * @param once If this event should only be run once
	 */
	public constructor(name: keyof ClientEvents, once: boolean = false){
		super(name, once);
	}
}

/**
 * Base class for player events
 */
abstract class PlayerEvent<K extends keyof PlayerEvents = keyof PlayerEvents> extends OTEvent {
	/**
	 * The name of the event
	 */
	declare public readonly name: K;

	/**
	 * Make a new player event
	 * @param name The name of the event
	 * @param once If this event should only be run once
	 */
	public constructor(name: K, once: boolean = false){
		super(name, once);
	}

	/**
	 * Run this event
	 */
	public abstract run: PlayerEvents[K];
}

export {
	ClientEvent,
	PlayerEvent
};