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
    }
}