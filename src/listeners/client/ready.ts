import {ApplyOptions} from "@sapphire/decorators";
import {Listener, SapphireClient} from "@sapphire/framework";
import {ActivityOptions, ActivityType} from "discord.js";

@ApplyOptions<Listener.Options>({
	event: "ready"
})
export class ReadyListener extends Listener<"ready"> {
	public run(client: SapphireClient<true>) {
		const activities: ActivityOptions[] = [
			{
				type: ActivityType.Playing,
				name: "Music"
			},
			{
				type: ActivityType.Listening,
				name: `${client.guilds.cache.size} guilds`
			}
		];
		let activityIndex = 0;
		client.user.setActivity(activities[activityIndex]);
		setInterval(
			() => {
				activityIndex = activityIndex === activities.length - 1 ? 0 : activityIndex + 1;
				client.user.setActivity(activities[activityIndex]);
			},
			5 * 60 * 1000
		);

		this.container.logger.info(`${client.user.username} is ready`);
	}
}
