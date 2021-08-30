import { Awaited, Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import { SlashCommand } from "./command";
import { ClientEvent } from "./event";
import { CustomPlayer } from "./player";

/**
 * An extended client class
 */
class CustomClient<Ready extends boolean = boolean> extends Client<Ready> {
	/**
	 * The commands of the client
	 */
	public readonly commands: Collection<string, SlashCommand> = new Collection();
	/**
	 * The player used to play songs
	 */
	public readonly player: CustomPlayer;

	private readonly events: Collection<string, {
		name: keyof ClientEvents;
		listener: (...args: ClientEvents[keyof ClientEvents]) => Awaited<void>;
	}> = new Collection();

	constructor(options: ClientOptions){
		super(options);
		this.player = new CustomPlayer(this);
	}

	public onCustom<K extends keyof ClientEvents>(file: string, event: K, listener: (...args: ClientEvents[K]) => Awaited<void>): this {
		this.events.set(file, {
			name: event,
			listener
		});
		return this.on(event, listener);
	}

	public reloadEvent(newEvent: ClientEvent, file: string): this {
		if(newEvent.once) return;
		const oldEvent = this.events.get(file);
		this.events.delete(file);
		return this
			.off(oldEvent.name, oldEvent.listener)
			.onCustom(file, newEvent.name, newEvent.run);
	}
}

export {CustomClient};