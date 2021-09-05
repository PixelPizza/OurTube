import {ClientEvent, SlashCommand} from "discord-extend";
import {ActivityOptions} from "discord.js";
import {CustomClient} from "../../client";
import {CustomConsole} from "../../console";
import {PlayerEvent} from "../../event";
import {Util} from "../../util";

module.exports = class extends ClientEvent<"ready"> {
	constructor() {
		super("ready", "ready", true);
	}

	async run(client: CustomClient<true>) {
		Util.watchDir("dist/commands", (command: SlashCommand) => client.registry.registerCommand(command))
			.watchDir("dist/events/client", (event: ClientEvent) =>
				client.offEvent(client.events.get(event.id)).onEvent(event)
			)
			.watchDir("dist/events/player", (event: PlayerEvent, file: string) =>
				client.player.reloadEvent(event, file)
			);

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
};
