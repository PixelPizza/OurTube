import { ClientEvent, CustomClient } from "../client";
import { CustomConsole } from "../console";

module.exports = class extends ClientEvent {
	constructor(client: CustomClient){
		super(client, "error");
	}

	run(error: string){
		CustomConsole.log(error);
	}
}