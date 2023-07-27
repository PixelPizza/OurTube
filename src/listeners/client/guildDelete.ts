import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import { Guild, EmbedBuilder, Colors, WebhookClient } from "discord.js";

@ApplyOptions<Listener.Options>({
	event: Events.GuildDelete
})
export class GuildDeleteListener extends Listener<typeof Events.GuildDelete> {
	public run(guild: Guild): any {
		return new WebhookClient({ url: this.container.env.GUILDS_URL }).send({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Red)
					.setTitle("Removed Guild")
					.setDescription(
						`${this.container.client.user?.username} has been removed from the guild ${guild.name}`
					)
					.setFooter({ text: guild.id })
					.setTimestamp()
			],
			username: guild.name,
			avatarURL: guild.iconURL() ?? undefined
		});
	}
}
