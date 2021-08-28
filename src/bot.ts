import {config} from "dotenv";
import {readdirSync} from "fs";
import {join} from "path";
import { CustomClient } from "./client";
config();

const client = new CustomClient({
	intents: []
});

for(const file of readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))){
	let command = require(`./commands/${file}`);
	// make a new command if a class is being used
	try { command = new command(client); } catch (error) {}
	client.commands.set(command.data.name, command);
}

for(const file of readdirSync(join(__dirname, "events")).filter(file => file.endsWith(".js"))){
	let event = require(`./events/${file}`);
	// make a new event if a class is being used
	try { event = new event(client); } catch (error) {}
	if(event.once){
		client.once(event.name, (...args) => event.run(...args));
		continue;
	}
	client.on(event.name, (...args) => event.run(...args));
}

client.login(process.env.TOKEN);