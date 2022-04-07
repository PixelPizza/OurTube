import {Command as SapphireCommand, PieceContext} from "@sapphire/framework";

export abstract class Command extends SapphireCommand {
	public constructor(context: PieceContext, options: SapphireCommand.Options) {
		super(context, {
			...options,
			preconditions: ["NotBlacklisted", ...(options.preconditions ?? [])]
		});
	}
}
