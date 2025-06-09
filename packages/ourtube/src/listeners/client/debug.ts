import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { Events } from "discord.js";

@ApplyOptions<Listener.Options>({
	emitter: process,
	event: Events.Debug,
})
export class DebugListener extends Listener<Events.Debug> {
	public override run(info: string): void {
		console.debug("[DEBUG]", info);
	}
}
