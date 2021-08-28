import {config} from "dotenv";
import {Client} from "discord.js";
import {CustomConsole} from "../console";
config();

const client = new Client({intents: []});
client.once("ready", () => {
	CustomConsole.log("ready", {
		a: 1,
		b: 2,
		someVeryLongVariableThatIsAlmostAtThePointThatItIsUnreadable: "some very long text that is a little more readable, but just as long"
	}, console);
});
client.login(process.env.TOKEN);
