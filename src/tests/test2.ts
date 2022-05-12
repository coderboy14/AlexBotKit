import 'dotenv/config';
import { Command, StringOption, UserOption } from "../Commands";
import { CommandInteraction, Intents } from "discord.js";
import DiscordBot from "../DiscordBot";

console.log("Building bot...");
const bot = new DiscordBot([Intents.FLAGS.DIRECT_MESSAGES], process.env.BOT_TOKEN!);

let command = new Command("poke", "Poke somebody");
command.addOption(new UserOption("target", true, "Who to poke"));
command.addOption(new StringOption("message", false, "What to say"));

console.log("Adding command!");
bot.addCommand(command, async (interaction) => {
    await interaction.reply("THE POKE STARTS!");
    interaction.channel?.send(`Hey ${interaction.options.getUser('target')} you were poked!`)
});

console.log("Starting bot...");
bot.start();

console.log("Done :D");