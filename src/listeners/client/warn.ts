import {ApplyOptions} from "@sapphire/decorators";
import {Listener, ListenerOptions} from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
	event: "warn"
})
export class DebugListener extends Listener<"warn"> {
	public run(warning: string): void {
		this.container.logger.warn(warning);
	}
}
