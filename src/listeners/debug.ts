import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import { CustomConsole } from "../console";

@ApplyOptions<ListenerOptions>({
	event: "debug"
})
export class DebugListener extends Listener<"debug"> {
	public run(info: string) {
		CustomConsole.log(info);
	}
}