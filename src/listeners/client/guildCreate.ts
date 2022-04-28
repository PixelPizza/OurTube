import {ApplyOptions} from "@sapphire/decorators";
import {Events, Listener, ListenerOptions} from "@sapphire/framework";
import {Guild, MessageEmbed, WebhookClient} from "discord.js";

@ApplyOptions<ListenerOptions>({
	event: Events.GuildCreate
})
export class GuildCreateListener extends Listener<typeof Events.GuildCreate> {
	public run(guild: Guild) {
		return new WebhookClient({url: process.env.GUILDS_URL}).send({
			embeds: [
				new MessageEmbed()
					.setColor("GREEN")
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
