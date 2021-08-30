import { ClientEvent } from "../../event";
import { CustomConsole } from "../../console";

module.exports = class extends ClientEvent {
	constructor(){
		super("warn");
	}

	run(warning: string){
		CustomConsole.log(warning);
	}
}