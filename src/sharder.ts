import {config} from "dotenv";
import {Shard, ShardingManager} from "discord.js";
import {join} from "path";
import {container, LogLevel} from "@sapphire/framework";
import {Logger} from "./logger";
config();

const logger = new Logger(container, {
	level: LogLevel.Debug
});

const logShardEvent = (shard: Shard, event: string) => logger.debug(`Shard ${shard.id} ${event}`);

new ShardingManager(join(__dirname, "bot.js"), {
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
