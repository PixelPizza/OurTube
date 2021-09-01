import {DextEvent} from "discord-extend";
import {PlayerEvents} from "discord-player";
import {Awaited} from "discord.js";
import {CustomClientEvents} from "./client";

/**
 * Base class for client events
 */
abstract class ClientEvent<K extends keyof CustomClientEvents = keyof CustomClientEvents> extends DextEvent<K> {
	public abstract run(...args: CustomClientEvents[K]): Awaited<void>;
}

/**
 * Base class for player events
 */
abstract class PlayerEvent<K extends keyof PlayerEvents = keyof PlayerEvents> extends DextEvent<K> {
	public constructor(name: K, once: boolean = false) {
		super("", name, once);
	}

	public abstract run: PlayerEvents[K];
}

export {ClientEvent, PlayerEvent};
