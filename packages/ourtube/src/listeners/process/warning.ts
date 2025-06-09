import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";

@ApplyOptions<Listener.Options>({
	emitter: process,
	event: "warning",
})
export class WarningListener extends Listener {
	public override run(warning: Error): void {
		console.warn("[WARNING] An warning occurred:", warning);
	}
}
