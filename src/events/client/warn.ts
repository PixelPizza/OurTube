import {ClientEvent} from "discord-extend";
import {CustomConsole} from "../../console";

module.exports = class extends ClientEvent<"warn"> {
	constructor() {
		super("warn", "warn");
	}

	run(warning: string) {
		CustomConsole.log(warning);
	}
};
