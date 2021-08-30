import { Player } from "discord-player";
import { Awaited, Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import { SlashCommand } from "./command";

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
	public readonly player: Player;

	private readonly events: Collection<string, {
		name: string,
		listener: (...args: any[]) => any
	}> = new Collection();

	constructor(options: ClientOptions){
		super(options);
		this.player = new Player(this);
	}

	public onCustom<K extends keyof ClientEvents>(file: string, event: K, listener: (...args: ClientEvents[K]) => Awaited<void>, once: boolean = false): this {
		this.events.set(file, {
			name: event,
			listener
		});
		return once ? this.once(event, listener) : this.on(event, listener);
	}

	public offCustom(file: string): this {
		const oldEvent = this.events.get(file);
		this.events.delete(file);
		return this.off(oldEvent.name, oldEvent.listener);
	}
}

export {CustomClient};