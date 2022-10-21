import {ApplyOptions} from "@sapphire/decorators";
import {Events, Listener} from "@sapphire/framework";
import {Guild, EmbedBuilder, Colors, WebhookClient} from "discord.js";

@ApplyOptions<Listener.Options>({
	event: Events.GuildCreate
})
export class GuildCreateListener extends Listener<typeof Events.GuildCreate> {
	public run(guild: Guild): any {
		return new WebhookClient({url: process.env.GUILDS_URL}).send({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Green)
					.setTitle("New Guild")
					.setDescription(`${this.container.client.user?.username} has been added to the guild ${guild.name}`)
					.setFooter({text: guild.id})
					.setTimestamp()
			],
			username: guild.name,
			avatarURL: guild.iconURL() ?? undefined
		});
	}
}
