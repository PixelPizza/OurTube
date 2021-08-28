import {config} from "dotenv";
import { MessageEmbed, WebhookClient } from "discord.js";
import {inspect} from "util";
config();

class CustomConsole {
	private static webhook: WebhookClient = new WebhookClient({url: process.env.CONSOLE_URL});
	static log(...params: any[]){
		const {TOKEN} = process.env;
		console.log(...params);
		this.webhook.send({
			embeds: params.map(param => new MessageEmbed({
				description: (typeof(param) == "string" ? param : `\`\`\`ts\n${inspect(param)}\`\`\``)
					.replaceAll(TOKEN, "BOT_TOKEN")
					.replaceAll(TOKEN
						.split('.')
						.map((val, i) => (i > 1 ? val.replace(/./g, '*') : val))
						.join('.'), "BOT_TOKEN")
			}))
		});
	}
}
export {CustomConsole};