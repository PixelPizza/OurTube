import { container, ListenerStore, Logger, LogLevel } from "@sapphire/framework";
import { ErrorListener } from "../../../../src";

describe("ErrorListener tests", () => {
	test("GIVEN error then logs error with error level", () => {
		container.logger = new Logger(LogLevel.None);
		const store = new ListenerStore();
		const listener = store.construct(ErrorListener, {
			path: "",
			name: "error",
			root: "",
			extension: ".js"
		});
		const oldError = container.logger.error.bind(container.logger);
		container.logger.error = vi.fn(oldError);
		const spy = vi.spyOn(container.logger, "error");
		const error = new Error("error message");

		listener.run(error);

		expect(spy).toHaveBeenCalledWith(error);
	});
});
