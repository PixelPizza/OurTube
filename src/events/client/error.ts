import { ClientEvent } from "../../event";
import { CustomConsole } from "../../console";

module.exports = class extends ClientEvent {
	constructor(){
		super("error");
	}

	run(error: string){
		CustomConsole.log(error);
	}
}