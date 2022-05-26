import {ApplyOptions} from "@sapphire/decorators";
import {Precondition} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import type {CommandInteraction} from "discord.js";

@ApplyOptions<Precondition.Options>({
	position: 1
})
export class NotBlacklistedPrecondition extends Precondition {
	public async chatInputRun(interaction: CommandInteraction) {
		return (await this.container.prisma.blacklist.findUnique({
			where: {
				user: interaction.user.id
			}
		}))
			? this.error({message: await resolveKey(interaction, "preconditions/notblacklisted:error")})
			: this.ok();
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		NotBlacklisted: never;
	}
}
