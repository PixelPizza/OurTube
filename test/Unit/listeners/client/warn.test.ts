import { container, ListenerStore, Logger, LogLevel } from "@sapphire/framework";
import { WarnListener } from "../../../../src";
import { expect } from "vitest";

describe("WarnListener tests", () => {
	test("GIVEN warning then logs warning with warn level", () => {
		container.logger = new Logger(LogLevel.None);
		const store = new ListenerStore();
		const listener = store.construct(WarnListener, {
			path: "",
			name: "warn",
			root: "",
			extension: ".js"
		});
		const oldWarn = container.logger.warn.bind(container.logger);
		container.logger.warn = vi.fn(oldWarn);
		const spy = vi.spyOn(container.logger, "warn");

		listener.run("warning");

		expect(spy).toHaveBeenCalledWith("warning");
	});
});
