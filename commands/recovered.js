const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
    name: "recovered",
    description: "Provides daily-updated data on COVID-19 case recoveries globally",
    async execute(message, args) {
        // Global recovered cases TOTAL
        if (!args.length) {
            let getTotalRecovered = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                return recovered = response.data;
            }
            let totalRecovered = await getTotalRecovered();
            return message.channel.send(`Globally, ${totalRecovered["recovered"]} people have recovered from COVID-19.`);
        }
        // Global recovered cases TODAY
        else if (args[0] === "today" || args[0] === "td"){
            let getTodayRecovered = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                return data = response.data;
            }
            let todayRecovered = await getTodayRecovered();
            return message.channel.send(`Globally, ${todayRecovered["todayRecovered"]} people have recovered from COVID-19.`);
        }
    }
}