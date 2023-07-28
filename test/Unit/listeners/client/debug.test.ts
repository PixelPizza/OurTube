import { container, ListenerStore, Logger, LogLevel } from "@sapphire/framework";
import { DebugListener } from "../../../../src";

describe("DebugListener tests", () => {
	test("GIVEN debug message then logs debug message with debug level", () => {
		container.logger = new Logger(LogLevel.None);
		const store = new ListenerStore();
		const listener = store.construct(DebugListener, {
			path: "",
			name: "debug",
			root: "",
			extension: ".js"
		});
		const oldDebug = container.logger.debug.bind(container.logger);
		container.logger.debug = vi.fn(oldDebug);
		const spy = vi.spyOn(container.logger, "debug");

		listener.run("debug message");

		expect(spy).toHaveBeenCalledWith("debug message");
	});
});
