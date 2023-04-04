import {ApplyOptions} from "@sapphire/decorators";
import {container, Listener} from "@sapphire/framework";
import type {GuildQueue} from "discord-player";

@ApplyOptions<Listener.Options>({
	emitter: container.player.events,
	event: "disconnect"
})
export class BotDisconnectListener extends Listener {
	public run(queue: GuildQueue): void {
		this.container.logger.debug(`[${queue.guild.name}] Got disconnected from guild, now clearing queue!`);
	}
}
