import {ApplyOptions} from "@sapphire/decorators";
import {Listener, ListenerOptions} from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
	event: "debug"
})
export class DebugListener extends Listener<"debug"> {
	public run(info: string): void  {
		this.container.logger.debug(info);
	}
}
