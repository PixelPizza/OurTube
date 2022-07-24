import {Command as SapphireCommand} from "@sapphire/framework";
import {resolveKey, StringMap, Target, TOptions} from "@sapphire/plugin-i18next";

export abstract class Command extends SapphireCommand {
	protected resolveCommandKey(target: Target, key: string | string[], options?: TOptions<StringMap>) {
		return resolveKey(target, `commands/${this.name}:${key}`, options);
	}
}

export namespace Command {
	export type AutocompleteInteraction = SapphireCommand.AutocompleteInteraction;
	export type ChatInputInteraction = SapphireCommand.ChatInputInteraction;
	export type Context = SapphireCommand.Context;
	export type ContextMenuInteraction = SapphireCommand.ContextMenuInteraction;
	export type JSON = SapphireCommand.JSON;
	export type Options = SapphireCommand.Options;
	export type Registry = SapphireCommand.Registry;
	export type RunInTypes = SapphireCommand.RunInTypes;
}
