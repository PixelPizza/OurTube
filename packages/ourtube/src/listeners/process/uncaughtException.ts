import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";

@ApplyOptions<Listener.Options>({
	emitter: process,
	event: "uncaughtException",
})
export class UncaughtExceptionListener extends Listener {
	override run(error: Error, origin: string): void {
		console.error("[ERROR] Uncaught Exception:", error, "Origin:", origin);
	}
}
