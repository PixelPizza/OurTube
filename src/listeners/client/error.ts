import {ApplyOptions} from "@sapphire/decorators";
import {Listener} from "@sapphire/framework";

@ApplyOptions<Listener.Options>({
	event: "error"
})
export class ErrorListener extends Listener<"error"> {
	public run(error: Error): void {
		this.container.logger.error(error);
	}
}
