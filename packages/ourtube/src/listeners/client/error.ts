import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { Events } from "discord.js";

@ApplyOptions<Listener.Options>({
	event: Events.Error
})
export class ErrorListener extends Listener<Events.Error> {
	public override run(error: Error): void {
		console.error("[ERROR]", error);
	}
}
