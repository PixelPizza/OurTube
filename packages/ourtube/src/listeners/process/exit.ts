import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";

@ApplyOptions<Listener.Options>({
	emitter: process,
	event: "exit",
	once: true,
})
export class ExitListener extends Listener {
	public override run(code: number): void {
		console.log("[INFO] Process exited with code:", code);
	}
}
