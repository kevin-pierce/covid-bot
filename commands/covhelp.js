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
                    { name: "```" + "!cases" + "```", value: 'Provides information regarding COVID-19 cases'}
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
                    { name: "```" + "!deaths [today/td] [country name]" + "```", value: 'Returns total number of deaths today in specified country'},
                    { name: "```" + "!deaths [yesterday/ytd]" + "```", value: 'Returns total number of deaths yesterday globally' },
                    { name: "```" + "!deaths [yesterday/ytd] [country name]" + "```", value: 'Returns total number of deaths yesterday in specified country'},
                    { name: "```" + "!deaths [historic/hs]" + "```", value: 'Returns graph of historical death numbers for the past 30 days globally' },
                    { name: "```" + "!deaths [historic/hs] [number of days]" + "```", value: 'Returns graph of historical death numbers for the past [number of days] globally'},
                    { name: "```" + "!deaths [historic/hs] [number of days] [country name]" + "```", value: 'Returns graph of historical death numbers for the past [number of days] in specified country'}
                    );

                return message.channel.send(deathHelpEmbed);
            }
            else if (args[0] === "recovered"){
                // do something else
            }
            else if (args[0] === "cases"){
                // do something
            }
        }
    }
}