import { ClientEvent } from "discord-extend";
import {CustomConsole} from "../../console";

module.exports = class extends ClientEvent<"error"> {
	constructor() {
		super("error", "error");
	}

	run(error: Error) {
		CustomConsole.log(error);
	}
};
