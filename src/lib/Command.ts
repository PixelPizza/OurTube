import {Command as SapphireCommand} from "@sapphire/framework";
import type {StringMap, Target, TOptions} from "@sapphire/plugin-i18next";
import {resolveMaybeKey} from "../utils";

export abstract class Command extends SapphireCommand {
	protected resolveCommandKey(target: Target, key: string, options?: TOptions<StringMap>) {
		return resolveMaybeKey(target, `commands/${this.name}:${key}`, options);
	}
}

export namespace Command {
	export type AutocompleteInteraction = SapphireCommand.AutocompleteInteraction;
	export type ChatInputInteraction = SapphireCommand.ChatInputCommandInteraction;
	export type Context = SapphireCommand.Context;
	export type ContextMenuInteraction = SapphireCommand.ContextMenuCommandInteraction;
	export type JSON = SapphireCommand.JSON;
	export type Options = SapphireCommand.Options;
	export type Registry = SapphireCommand.Registry;
	export type RunInTypes = SapphireCommand.RunInTypes;
}
