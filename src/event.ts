import {DextEvent} from "discord-extend";
import {PlayerEvents} from "discord-player";

/**
 * Base class for player events
 */
abstract class PlayerEvent<K extends keyof PlayerEvents = keyof PlayerEvents> extends DextEvent<K> {
	public constructor(name: K, once: boolean = false) {
		super("", name, once);
	}

	public abstract run: PlayerEvents[K];
}

export {PlayerEvent};
