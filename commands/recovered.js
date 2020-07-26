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
        // Data for TODAY
        else if (args[0] === "today" || args[0] === "td"){
            // Globally recovered cases TODAY
            if (args.length == 1) {
                let getTodayRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    return data = response.data;
                }
                let todayRecovered = await getTodayRecovered();
                return message.channel.send(`Today, ${todayRecovered["todayRecovered"]} people have recovered from COVID-19.`);
            }
            // Country-specific recovered cases TODAY
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
        // Data for YESTERDAY
        else if (args[0] === "yesterday" || args[0] === "ytd") {
            // Global recovered cases YESTERDAY
            if (args.length == 1) {
                let getYTDRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                    return data = response.data;
                }
                let totalYTDRecovered = await getYTDRecovered();
                
                console.log(totalYTDRecovered["todayRecovered"]);
                message.channel.send(`Yesterday, ${totalYTDRecovered["todayRecovered"]} people recovered from COVID-19.`);
            }
            // Country-specific recovered YESTERDAY
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getYTDCountryRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=true&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                        }
                    });
                    return data = response.data;
                }
                let totalYTDCountryRecovered = await getYTDCountryRecovered();
                
                console.log(totalYTDCountryRecovered["todayRecovered"]);
                message.channel.send(`Yesterday, ${totalYTDCountryRecovered["todayRecovered"]} people recovered from COVID-19 in ${totalYTDCountryRecovered["country"]}.`);
            }
        }
    }
}