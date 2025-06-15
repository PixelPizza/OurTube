import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { Events } from "discord.js";

@ApplyOptions<Listener.Options>({
	event: Events.Warn
})
export class WarnListener extends Listener<Events.Warn> {
	public override run(message: string): void {
		console.warn("[WARNING]", message);
	}
}
