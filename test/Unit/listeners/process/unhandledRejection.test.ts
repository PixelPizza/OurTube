import { container, ListenerStore, Logger, LogLevel } from "@sapphire/framework";
import { UnhandledRejectionListener } from "../../../../src";

describe("UnhandledRejectionListener tests", () => {
	test("GIVEN reason and promise then logs reason and promise with error level", () => {
		container.logger = new Logger(LogLevel.None);
		const store = new ListenerStore();
		const listener = store.construct(UnhandledRejectionListener, {
			path: "",
			name: "unhandledRejection",
			root: "",
			extension: ".js"
		});
		const oldError = container.logger.error.bind(container.logger);
		container.logger.error = vi.fn(oldError);
		const spy = vi.spyOn(container.logger, "error");
		const promise = Promise.resolve();

		listener.run("reason", promise);

		expect(spy).toHaveBeenCalledWith("Unhandled rejection:", promise, "reason:", "reason");
	});
});
