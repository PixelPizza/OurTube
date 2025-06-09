import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { Events, type Client } from "discord.js";

@ApplyOptions<Listener.Options>({
	event: Events.ClientReady,
	once: true
})
export class ReadyListener extends Listener<Events.ClientReady> {
	public override run(client: Client<true>): void {
		console.log(
			`[INFO] Logged in as ${client.user?.tag} (${client.user?.id})`
		);
	}
}
