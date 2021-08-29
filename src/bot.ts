import {config} from "dotenv";
import {readdirSync} from "fs";
import {join} from "path";
import { CustomClient } from "./client";
config();

const client = new CustomClient({
	intents: [
		"GUILDS",
		"GUILD_VOICE_STATES"
	]
});

for(const file of readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))){
	let command = require(`./commands/${file}`);
	// make a new command if a class is being used
	try { command = new command(); } catch (error) {}
	client.commands.set(command.data.name, command);
}

for(const file of readdirSync(join(__dirname, "events")).filter(file => file.endsWith(".js"))){
	let event = require(`./events/${file}`);
	// make a new event if a class is being used
	try { event = new event(); } catch (error) {}
	client.onCustom(file, event.name, (...args) => event.run(...args), event.once);
}

client.login(process.env.TOKEN);