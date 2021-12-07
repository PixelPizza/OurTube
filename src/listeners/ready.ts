import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions, SapphireClient } from "@sapphire/framework";
import { ActivityOptions } from "discord.js";
import { CustomConsole } from "../console";

@ApplyOptions<ListenerOptions>({
	event: "ready"
})
export class ReadyListener extends Listener<"ready"> {
	async run(client: SapphireClient<true>) {
		try {
			CustomConsole.log("Setting default permission for guild (/) commands.");

			for (const command of (await (await client.guilds.fetch(process.env.GUILD)).commands.fetch()).values()) {
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

		const activities: ActivityOptions[] = [
			{
				type: "PLAYING",
				name: "Music"
			},
			{
				type: "LISTENING",
				name: `${client.guilds.cache.size} guilds`
			}
		];
		let activityIndex = 0;
		client.user.setActivity(activities[activityIndex]);
		setInterval(() => {
			activityIndex = activityIndex === activities.length - 1 ? 0 : activityIndex + 1;
			client.user.setActivity(activities[activityIndex]);
		}, 5 * 60 * 1000);

		CustomConsole.log(`${client.user.username} is ready`);
	}
}