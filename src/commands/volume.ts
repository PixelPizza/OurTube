import { Listener, UnknownChatInputCommandPayload } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";

export class UnknownCommandListener extends Listener<"unknownChatInputCommand"> {
    run({interaction}: UnknownChatInputCommandPayload) {
        interaction.reply({
            embeds: [
                new MessageEmbed({
                    color: "RED",
                    title: "Coming soon",
                    description: "This command is not yet implemented."
                })
            ]
        });
    }
}
