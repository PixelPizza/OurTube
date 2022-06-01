import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import type {Queue} from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player,
	event: "botDisconnect"
})
export class BotDisconnectListener extends Listener {
	public run(queue: Queue): void {
		this.container.logger.debug(`[${queue.guild.name}] Got disconnected from guild, now clearing queue!`);
	}
}
