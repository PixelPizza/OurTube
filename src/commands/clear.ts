import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";
@ApplyOptions<CommandOptions>({
    description: "clear the queue",
    preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class ClearCommand extends Command {
    public registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand(new SlashCommandBuilder().setName(this.name).setDescription(this.description));
    }
    public async chatInputRun(interaction: CommandInteraction) {
        await interaction.deferReply();
        this.container.player.getQueue(interaction.guild).clear();
        interaction.editReply({
            embeds: [
                new MessageEmbed({
                    color: "GREEN",
                    title: this.container.getTranslation(interaction, "commands/clear:success.title"),
                    description: this.container.getTranslation(interaction, "commands/clear:success.description")
                })
            ]
        });
    }
}
