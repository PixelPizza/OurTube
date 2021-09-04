import { ClientEvent } from "discord-extend";
import {CustomConsole} from "../../console";

module.exports = class extends ClientEvent<"debug"> {
	constructor() {
		super("debug", "debug");
	}

	run(info: string) {
		CustomConsole.log(info);
	}
};
