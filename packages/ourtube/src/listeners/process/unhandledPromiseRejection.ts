import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";

@ApplyOptions<Listener.Options>({
	emitter: process,
	event: "unhandledRejection"
})
export class UnhandledPromiseRejectionListener extends Listener {
	public override run(reason: string, promise: Promise<unknown>): void {
		console.error("[ERROR] Unhandled Promise Rejection:", reason, promise);
	}
}
