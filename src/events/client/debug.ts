import { ClientEvent } from "../../event";
import { CustomConsole } from "../../console";

module.exports = class extends ClientEvent {
	constructor(){
		super("debug");
	}

	run(info: string){
		CustomConsole.log(info);
	}
}