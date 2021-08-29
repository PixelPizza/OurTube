import {REST} from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ActivityOptions } from "discord.js";
import { ClientEvent, CustomClient } from "../client";
import { CustomConsole } from "../console";

module.exports = class extends ClientEvent {
	constructor(){
		super("ready", true);
	}

	async run(client: CustomClient<true>){
		const rest = new REST({version: "9"}).setToken(client.token),
			guildId = process.env.GUILD;

		try {
			const {user, commands} = client;

			CustomConsole.log(`Started refreshing ${commands.size} application (/) commands.`);

			const clientId = user.id,
				[globalCommands, guildCommands] = commands.partition(command => command.global);

			CustomConsole.log(`Refreshing ${globalCommands.size} global (/) commands.`);

			await rest.put(
				Routes.applicationCommands(clientId),
				{body: globalCommands.map(command => command.data.toJSON())}
			);

			CustomConsole.log(`Refreshing ${guildCommands.size} guild (/) commands.`);

			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{body: guildCommands.map(command => command.data.toJSON())}
			);

			CustomConsole.log(`Successfully reloaded ${commands.size} application (/) commands.`);
		} catch (error) {
			CustomConsole.log(error);
		}

		try {
			CustomConsole.log("Setting default permission for guild (/) commands.");

			for(const command of (await (await client.guilds.fetch(guildId)).commands.fetch()).values()){
				await command.permissions.add({
					permissions: [
						{
							id: process.env.OWNER,
							type: "USER",
							permission: true
						}
					]
				});
			}

			CustomConsole.log("Successfully set default permission for guild (/) commands.");
		} catch (error) {
			CustomConsole.log(error);
		}
		
		const activities: ActivityOptions[] = [{
			type: "PLAYING",
			name: "Music"
		}, {
			type: "LISTENING",
			name: `${client.guilds.cache.size} guilds`
		}];
		let activityIndex = 0;
		client.user.setActivity(activities[activityIndex]);
		setInterval(() => {
			activityIndex = activityIndex === activities.length - 1 ? 0 : activityIndex + 1;
			client.user.setActivity(activities[activityIndex]);
		}, 5 * 60 * 1000);

		CustomConsole.log(`${client.user.username} is ready`);
	}
}