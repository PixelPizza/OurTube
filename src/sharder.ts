import {config} from "dotenv";
import {dirname, join} from "path";
import {Shard, ShardingManager} from "discord.js";
import {container, LogLevel} from "@sapphire/framework";
import {Logger} from "./logger";
config();

const logger = new Logger(container, {
	level: LogLevel.Debug
});

const logShardEvent = (shard: Shard, event: string) => logger.debug(`Shard ${shard.id} ${event}`);

new ShardingManager(join(dirname(new URL(import.meta.url).pathname), "bot.mjs").substring(1), {
	token: process.env.TOKEN,
	mode: "worker"
})
	.on("shardCreate", shard => {
		logShardEvent(shard, "launched");
		shard
			.on("death", () => logShardEvent(shard, "died"))
			.on("ready", () => logShardEvent(shard, "ready"))
			.on("disconnect", () => logShardEvent(shard, "disconnected"))
			.on("reconnecting", () => logShardEvent(shard, "reconnecting"));
	})
	.spawn()
	.catch(reason => logger.error("Shard spawn error", reason));
