require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const { readdirSync } = require('fs');

client.commands = new Discord.Collection(); // Create a new Collection consisting of all our Discord bot commands

// Place all command files into our Collection
const commandFiles = readdirSync('./commands/').filter(file => file.endsWith(".js"));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(file);
}

// Discord bot client login
client.on("ready", () =>{
    console.log("Ready!");
});

client.on("message", async message => {
    // Do nothing if the message does not start with the command prefix, or if a bot is sending a message
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    // Isolate command and args
    const args = message.content.toLowerCase().slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "deaths") {
        client.commands.get("deaths").execute(message, args);
    }
    else if (command === "recovered") {
        client.commands.get("recovered").execute(message, args);
    }
    else if (command === "cases") {
        client.commands.get("cases").execute(message, args);
    }
    else if (command === "leaderboard") {
        client.commands.get("leaderboard").execute(message, args);
    }
    else if (command === "covhelp") {
        client.commands.get("covhelp").execute(message, args);
    }
});

client.login();