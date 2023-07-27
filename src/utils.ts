import type { StringMap, Target, TOptions } from "@sapphire/plugin-i18next";
import { resolveKey } from "@sapphire/plugin-i18next";

export function resolveMaybeKey(target: Target, key: string, options?: TOptions<StringMap>): Promise<string> {
	return resolveKey(target, key, {
		...options,
		defaultValue: key
	});
}
