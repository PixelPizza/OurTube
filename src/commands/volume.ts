import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions, RegisterBehavior } from "@sapphire/framework";
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
        const queue = this.container.player.getQueue(interaction.guild);

        if (!volume) {
            return interaction.editReply({
                embeds: [
                    new MessageEmbed({
                        color: "BLUE",
                        title: "Volume",
                        description: `The current volume is ${queue.volume}%`
                    })
                ]
            });
        }

        queue.setVolume(volume);

        interaction.editReply({
            embeds: [
                new MessageEmbed({
                    color: "GREEN",
                    title: "Volume",
                    description: `The volume has been set to ${volume}%`
                })
            ]
        });
    }
}
