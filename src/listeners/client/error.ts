import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
	event: "error"
})
export class DebugListener extends Listener<"error"> {
	public run(error: Error) {
		this.container.logger.error(error);
	}
}