import {Command as SapphireCommand, PieceContext} from "@sapphire/framework";

export abstract class Command extends SapphireCommand {
	public constructor(context: PieceContext, options: Command.Options) {
		super(context, {
			..options,
			preconditions: [...options.preconditions, "NotBlacklisted"]
		});
	}
}
