import { ActivityOptions } from "discord.js";
import { watch } from "fs";
import { CustomClient } from "../../client";
import { CustomConsole } from "../../console";
import { ClientEvent } from "../../event";

module.exports = class extends ClientEvent {
	constructor(){
		super("ready", true);
	}

	async run(client: CustomClient<true>){
		watch("dist/commands", "utf8", (eventType, file) => {
			if(eventType != "change") return;
			const path = `../../commands/${file}`;
			delete require.cache[require.resolve(path)];
			let command = require(path);
			try { command = new command(); } catch (error) {}
			client.commands.set(command.data.name, command);
		});
		watch("dist/events/client", "utf8", (eventType, file) => {
			if(eventType != "change") return;
			client.offCustom(file);
			const path = `./${file}`;
			delete require.cache[require.resolve(path)];
			let event = require(path);
			try { event = new event(); } catch (error) {}
			client.onCustom(file, event.name, (...args) => event.run(...args));
		});

		try {
			CustomConsole.log("Setting default permission for guild (/) commands.");

			for(const command of (await (await client.guilds.fetch(process.env.GUILD)).commands.fetch()).values()){
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