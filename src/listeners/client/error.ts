import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import { CustomConsole } from "../../console";

@ApplyOptions<ListenerOptions>({
	event: "error"
})
export class DebugListener extends Listener<"error"> {
	public run(error: Error) {
		CustomConsole.log(error);
	}
}