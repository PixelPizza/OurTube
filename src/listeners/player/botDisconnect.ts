import { ApplyOptions } from "@sapphire/decorators";
import { container, Listener, ListenerOptions } from "@sapphire/framework";
import { Queue } from "discord-player";
import { CustomConsole } from "../../console";

@ApplyOptions<ListenerOptions>({
	emitter: container.player,
	event: "botDisconnect"
})
export class BotDisconnectListener extends Listener {
	public run(queue: Queue) {
		CustomConsole.log(`[${queue.guild.name}] Got disconnected from guild, now clearing queue!`);
	}
}