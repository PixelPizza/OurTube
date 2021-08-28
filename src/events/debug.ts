import { ClientEvent, CustomClient } from "../client";
import { CustomConsole } from "../console";

module.exports = class extends ClientEvent {
	constructor(client: CustomClient){
		super(client, "debug");
	}

	run(info: string){
		CustomConsole.log(info);
	}
}