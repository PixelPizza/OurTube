import {ClientOptions} from "discord.js";
import {Client} from "discord-extend";
import {CustomPlayer} from "./player";

/**
 * An extended client class
 */
class CustomClient<Ready extends boolean = boolean> extends Client<Ready> {
	/**
	 * The player used to play songs
	 */
	public readonly player: CustomPlayer;

	constructor(options: ClientOptions) {
		super(options);
		this.player = new CustomPlayer(this);
	}
}

export {CustomClient};
