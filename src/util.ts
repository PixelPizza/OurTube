import { watch } from "fs";

class Util {
	public static watchDir(dir: string, fn: (value: unknown, file: string) => any): typeof this {
		watch(dir, "utf8", (eventType, file) => {
			if(eventType != "change" || !file.endsWith(".js")) return;
			const path = `../${dir}/${file}`;
			delete require.cache[require.resolve(path)];
			let value = require(path);
			try { value = new value(); } catch {}
			fn(value, file);
		});
		return this;
	}
}

export {Util};