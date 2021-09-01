import { readdirSync, watch } from "fs";
import { join } from "path";

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

	public static getJSFiles(dir: string, fn: (values: unknown[], files: string[]) => any): typeof this {
		const files = readdirSync(join(__dirname, dir)).filter(file => file.endsWith(".js"));
		fn(files.map(file => {
			let value = require(`./${dir}/${file}`);
			// create new if value is a class
			try { value = new value(); } catch {}
			return value;
		}), files);
		return this;
	}
}

export {Util};