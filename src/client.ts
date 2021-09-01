import { Awaited, ClientEvents, ClientOptions, Collection, CommandInteraction } from "discord.js";
import {Client} from "discord-extend";
import { CustomSlashCommand, SlashCommandCheck } from "./command";
import { ClientEvent } from "./event";
import { CustomPlayer } from "./player";
import { Util } from "./util";

type CustomClientEvents = ClientEvents & {command: [interaction: CommandInteraction, command: CustomSlashCommand]};

/**
 * An extended client class
 */
class CustomClient<Ready extends boolean = boolean> extends Client<Ready> {
	/**
	 * The commands of the client
	 */
	public readonly commands: Collection<string, CustomSlashCommand> = new Collection();
	/**
	 * The player used to play songs
	 */
	public readonly player: CustomPlayer;

	private readonly events: Collection<string, {
		name: keyof CustomClientEvents;
		listener: (...args: CustomClientEvents[keyof CustomClientEvents]) => Awaited<void>;
	}> = new Collection();

	constructor(options: ClientOptions){
		super(options);
		this.player = new CustomPlayer(this);

		Util.getJSFiles("checks", (checks: SlashCommandCheck[]) => {
			this.on("interactionCreate", interaction => {
				if(!interaction.isCommand()) return;

				const command = this.commands.get(interaction.commandName);

				if(!command) return;

				for(const check of checks.sort((first, second) => first.index - second.index))
					if(!check.isValid(interaction, command)) return interaction.reply(check.reply);

				this.emit("command", interaction, command);
			});
		});
	}

	public once<K extends keyof CustomClientEvents>(event: K, listener: (...args: CustomClientEvents[K]) => Awaited<void>): this {
		return super.once(event as string, listener);
	}

	public on<K extends keyof CustomClientEvents>(event: K, listener: (...args: CustomClientEvents[K]) => Awaited<void>) : this {
		return super.on(event as string, listener);
	}

	public off<K extends keyof CustomClientEvents>(event: K, listener: (...args: CustomClientEvents[K]) => Awaited<void>): this {
		return super.off(event as string, listener);
	}

	public onCustom<K extends keyof CustomClientEvents>(file: string, event: K, listener: (...args: CustomClientEvents[K]) => Awaited<void>): this {
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

export {
	CustomClient,
	CustomClientEvents
};