import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "set the volume of the player",
    preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class VolumeCommand extends Command {
    public registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand({
            name: this.name,
            description: this.description,
            options: [
                {
                    type: "INTEGER",
                    name: "volume",
                    description: "the volume to set the player to",
                    minValue: 10,
                    maxValue: 200,
                    required: false
                }
            ]
        });
    }

    public async chatInputRun(interaction: CommandInteraction) {
        await interaction.deferReply();

        const volume = interaction.options.getInteger("volume");
        const queue = this.container.player.getQueue(interaction.guild!);

        if (!volume) {
            return interaction.editReply({
                embeds: [
                    new MessageEmbed({
                        color: "BLUE",
                        title: "Volume",
                        description: this.container.getTranslation(interaction, "commands/volume:success.description.current", { replace: { volume: queue.volume } })
                    })
                ]
            });
        }

        queue.setVolume(volume);

        return interaction.editReply({
            embeds: [
                new MessageEmbed({
                    color: "GREEN",
                    title: this.container.getTranslation(interaction, "commands/volume:success.title"),
                    description: this.container.getTranslation(interaction, "commands/volume:success.description.changed", { replace: { volume } })
                })
            ]
        });
    }
}
