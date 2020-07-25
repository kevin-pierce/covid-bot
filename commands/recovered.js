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
            if (args.length == 1) {
                let getTodayRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    return data = response.data;
                }
                let todayRecovered = await getTodayRecovered();
                return message.channel.send(`Today, ${todayRecovered["todayRecovered"]} people have recovered from COVID-19.`);
            }
            else if (args.length == 2){
                let country = args.slice(1).join(" ");
        
                        let getTodayRecoveredCountry = async () => {
                            let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=false&strict=true&query").catch(err =>{
                                if (err.response){
                                    message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                                }
                            });
                            return data = response.data;
                        }
                        let todayRecoveredCountry = await getTodayRecoveredCountry();
                        console.log(todayRecoveredCountry);
                        return message.channel.send(`Today, ${todayRecoveredCountry["todayRecovered"]} people have recovered from COVID-19 in ${todayRecoveredCountry["country"]}.`);

            }
            
        }
    }
}