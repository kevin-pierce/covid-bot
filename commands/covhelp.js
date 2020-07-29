const Discord = require('discord.js');

module.exports = {
    name: "covhelp",
    description: "Provides information regarding all functions",
    async execute(message, args){
        
        if (!args.length){
            const helpMenuEmbed = new Discord.MessageEmbed()
                .setTitle("COVID-Bot Help")
                .setColor("#990000")
                .addFields(
                    { name: 'Need more help? Type !covhelp [command] for more info!', value: '\u200b' },
                    { name: "```" + "!deaths" + "```", value: 'Provides information regarding COVID-19 deaths' },
                    { name: "```" + "!recovered" + "```", value: 'Provides information regarding COVID-19 recoveries' },
                    { name: "```" + "!cases" + "```", value: 'Provides information regarding COVID-19 cases'},
                    { name: "```" + "!leaderboard" + "```", value: 'Displays top 10 countries in each statistical category'}
                    );

            return message.channel.send(helpMenuEmbed);
        }
        else if (args.length == 1) {
            if (args[0] === "deaths"){
                const deathHelpEmbed = new Discord.MessageEmbed()
                .setTitle("!deaths Help")
                .setColor("#990000")
                .addFields(
                    { name: "```" + "!deaths" + "```", value: 'Returns total number of deaths globally' },
                    { name: "```" + "!deaths [today/td]" + "```", value: 'Returns total number of deaths today globally' },
                    { name: "```" + "!deaths [today/td] [country name]" + "```", value: 'Returns total number of deaths today in a specified country'},
                    { name: "```" + "!deaths [yesterday/ytd]" + "```", value: 'Returns total number of deaths yesterday globally' },
                    { name: "```" + "!deaths [yesterday/ytd] [country name]" + "```", value: 'Returns total number of deaths yesterday in a specified country'},
                    { name: "```" + "!deaths [historic/hs]" + "```", value: 'Returns graph of historical death numbers for the past 30 days globally' },
                    { name: "```" + "!deaths [historic/hs] [number of days]" + "```", value: 'Returns graph of historical death numbers for the past [number of days] globally'},
                    { name: "```" + "!deaths [historic/hs] [number of days] [country name]" + "```", value: 'Returns graph of historical death numbers for the past [number of days] in a specified country'}
                    );

                return message.channel.send(deathHelpEmbed);
            }
            else if (args[0] === "recovered"){
                const recoveredHelpEmbed = new Discord.MessageEmbed()
                .setTitle("!recovered Help")
                .setColor("#990000")
                .addFields(
                    { name: "```" + "!recovered" + "```", value: 'Returns total number of COVID-19 case recoveries globally' },
                    { name: "```" + "!recovered [today/td]" + "```", value: 'Returns total number of COVID-19 case recoveries today globally' },
                    { name: "```" + "!recovered [today/td] [country name]" + "```", value: 'Returns total number of COVID-19 case recoveries today in a specified country'},
                    { name: "```" + "!recovered [yesterday/ytd]" + "```", value: 'Returns total number of COVID-19 case recoveries yesterday globally' },
                    { name: "```" + "!recovered [yesterday/ytd] [country name]" + "```", value: 'Returns total number of COVID-19 case recoveries yesterday in a specified country'},
                    { name: "```" + "!recovered [historic/hs]" + "```", value: 'Returns graph of historical recovery numbers for the past 30 days globally' },
                    { name: "```" + "!recovered [historic/hs] [number of days]" + "```", value: 'Returns graph of historical recovery numbers for the past [number of days] globally'},
                    { name: "```" + "!recovered [historic/hs] [number of days] [country name]" + "```", value: 'Returns graph of historical recovery numbers for the past [number of days] in a specified country'}
                    );

                return message.channel.send(recoveredHelpEmbed);
            }
            else if (args[0] === "cases"){
                const casesHelpEmbed = new Discord.MessageEmbed()
                .setTitle("!cases Help")
                .setColor("#990000")
                .addFields(
                    { name: "```" + "!cases" + "```", value: 'Returns total number of COVID-19 cases globally' },
                    { name: "```" + "!cases [today/td]" + "```", value: 'Returns total number of new COVID-19 cases today globally' },
                    { name: "```" + "!cases [today/td] [country name]" + "```", value: 'Returns total number of new COVID-19 cases today in a specified country'},
                    { name: "```" + "!cases [yesterday/ytd]" + "```", value: 'Returns total number of new COVID-19 cases yesterday globally' },
                    { name: "```" + "!cases [yesterday/ytd] [country name]" + "```", value: 'Returns total number of new COVID-19 cases yesterday in a specified country'},
                    { name: "```" + "!cases [historic/hs]" + "```", value: 'Returns graph of case numbers for the past 30 days globally' },
                    { name: "```" + "!cases [historic/hs] [number of days]" + "```", value: 'Returns graph of case numbers for the past [number of days] globally'},
                    { name: "```" + "!cases [historic/hs] [number of days] [country name]" + "```", value: 'Returns graph of case numbers for the past [number of days] in a specified country'}
                    );

                return message.channel.send(casesHelpEmbed);
            }
            else if (args[0] === "leaderboard"){
                const leaderboardHelpEmbed = new Discord.MessageEmbed()
                .setTitle("!leaderboard Help")
                .setColor("#990000")
                .addFields(
                    { name: "```" + "!leaderboard" + "```", value: 'Returns a list of the top 10 countries leading in the number of COVID-19 cases, COVID-19-related deaths, and COVID-19 case recoveries' }
                );

                return message.channel.send(leaderboardHelpEmbed);
            } else {
                return message.channel.send(`Unknown command. Please type !covhelp to view all available commands.`);
            }
        }
        else if (args.length > 1){
            return message.channel.send(`Too many arguments. Use !covhelp [command name] to get more information on a specific command.`);
        }
    }
}