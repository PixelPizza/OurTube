import {config} from "dotenv";
import { MessageEmbed, WebhookClient } from "discord.js";
import {inspect} from "util";
config();

class CustomConsole {
	private static webhook: WebhookClient = new WebhookClient({url: process.env.CONSOLE_URL});
	static log(...params: any[]){
		console.log(...params);
		this.webhook.send({
			embeds: params.map(param => new MessageEmbed({
				description: typeof(param) == "string" ? param : `\`\`\`ts\n${inspect(param)}\`\`\``
			}))
		});
	}
}
export {CustomConsole};