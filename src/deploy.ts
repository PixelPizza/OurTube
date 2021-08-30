import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path/posix";
import { SlashCommand } from "./command";
import { CustomConsole } from "./console";
config();

const commands: SlashCommand[] = readdirSync(join(__dirname, "commands"))
	.filter(file => file.endsWith(".js"))
	.map(file => {
		let command: SlashCommand = require(`./commands/${file}`);
		// make a new command if a class is being used
		// @ts-ignore
		try { command = new command(); } catch (error) {}
		return command;
	}),
	rest = new REST({version: "9"}).setToken(process.env.TOKEN),
	guildId = process.env.GUILD,
	clientId = process.env.CLIENT;

(async () => {
	try {
		CustomConsole.log(`Started refreshing ${commands.length} application (/) commands.`);
	
		const globalCommands = commands.filter(command => command.global),
			guildCommands = commands.filter(command => !command.global);
	
		CustomConsole.log(`Refreshing ${globalCommands.length} global (/) commands.`);
	
		await rest.put(
			Routes.applicationCommands(clientId),
			{body: globalCommands.map(command => command.data.toJSON())}
		);

		CustomConsole.log(`Refreshing ${guildCommands.length} guild (/) commands.`);

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{body: guildCommands.map(command => command.data.toJSON())}
		);

		CustomConsole.log(`Successfully reloaded ${commands.length} application (/) commands.`);
	} catch (error) {
		CustomConsole.log(error);
	}
})();