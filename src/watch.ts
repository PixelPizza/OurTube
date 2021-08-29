import Collection from "@discordjs/collection";
import { exec } from "child_process";
import { existsSync, readFileSync, unlinkSync, watch } from "fs";

const cooldowns: Collection<string, boolean> = new Collection();

const watchChanges = (dir?: string) => {
	watch(`src${dir ? `/${dir}` : ""}`, {encoding: "utf8"}, async (event, fileName) => {
		let path = `src${dir ? `/${dir}` : ""}`;
		if(!(fileName.endsWith(".ts") || fileName.endsWith(".js"))) return;
		path += `/${fileName}`;
		if(cooldowns.get(path)) return;
		cooldowns.set(path, true);
		setTimeout(() => cooldowns.set(path, false), 5000);
		if(!existsSync(path) || !readFileSync(path, "utf8")){
			unlinkSync(`dist/${dir ? `${dir}/` : ""}${fileName.substring(0, fileName.length - 2)}js`);
			return;
		}
		if(event == "change") exec("npm run build");
	});
}

watchChanges();
watchChanges("commands");
watchChanges("events");

console.log("now watching all files in src");