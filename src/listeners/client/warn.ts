import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import { CustomConsole } from "../../console";

@ApplyOptions<ListenerOptions>({
	event: "warn"
})
export class DebugListener extends Listener<"warn"> {
	public run(warning: string) {
		CustomConsole.log(warning);
	}
}