const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
    name: "deaths",
    description: "Provides daily-updated data on COVID-19 related deaths globally",
    async execute(message, args){
        // Global deaths TOTAL
        if (!args.length) {
            let getTotalDeaths = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                let deaths = response.data;
                return deaths;
            }
            let totalDeaths = await getTotalDeaths();
            return message.channel.send(`Globally, ${numberWithCommas(totalDeaths["deaths"])} people have died due to COVID-19.`);
        }
        // Deaths TODAY
        else if ((args[0] === "today" || args[0] === "td")) {
            // Global deaths TODAY
            if (args.length == 1) {
                let getDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    let deaths = response.data;
                    return deaths;
                }
                let info = await getDeaths();
                message.channel.send(`Today, ${numberWithCommas(info["todayDeaths"])} people have died due to COVID-19.`);
            }
            // Country-specific deaths TODAY
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=false&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                        }
                    });
                    return deaths = response.data;
                }
                let info = await getDeaths();
                message.channel.send(`Today, ${numberWithCommas(info["todayDeaths"])} people have died due to COVID-19 in ${info["country"]}.`);
            }
        }
        // Deaths YESTERDAY
        else if (args[0] === "yesterday" || args[0] === "ytd") {
            // Global deaths YESTERDAY
            if (args.length == 1) {
                let getDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                    return deaths = response.data;
                }
                let info = await getDeaths();
                message.channel.send(`Yesterday, ${numberWithCommas(info["todayDeaths"])} people died due to COVID-19.`);
            }
            // Country-specific deaths YESTERDAY
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=true&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                        }
                    });
                    return deaths = response.data;
                }
                let info = await getDeaths();
                message.channel.send(`Yesterday, ${numberWithCommas(info["todayDeaths"])} people died due to COVID-19 in ${info["country"]}.`);
            }
            else {
                return message.channel.send(`<@${message.author.id}> - Invalid arguments. Please type !covhelp for help with commands.`);
            }
        }
        // HISTORIC Deaths (Sends a graph)
        else if (args[0] === "historic" || args[0] === "hs") {
            // No specified number of days (defaulted to 30)
            if (args.length == 1) {
                let deathData = [];
                let xAxisLabels = [];

                let getHistoricDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                    return historicDeaths = response.data;
                }
                let info = await getHistoricDeaths();
                // Format x-axis labels and compile data to be used on graph
                for (day in info["deaths"]){
                    xAxisLabels.push("\"" + day + "\"");
                    deathData.push(info["deaths"][`${day}`])
                }
                // Create a new embedded message for the bot to display historic deaths
                const historicDeathEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle("Historic Deaths for the Past 30 Days Globally")
                    .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Deaths',data:[${deathData}],fill:false,borderColor:"rgb(178,34,34)",pointBackgroundColor:"rgb(178,34,34)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicDeathEmbed);
            }
            // Specified number of days
            else if (args.length == 2 && typeof(parseFloat(args[1])) === 'number') {
                let numDays = args[1];

                // Input validation - the number of days must be an integer between 2 and 100, inclusive
                if (!Number.isInteger(parseFloat(numDays)))
                    return message.channel.send(`<@${message.author.id}> - Number of days must be a valid integer.`);
                else if (numDays > 100)
                    return message.channel.send(`<@${message.author.id}> - I can only display data from up to the past 100 days.`);
                else if (numDays < 2)
                    return message.channel.send(`<@${message.author.id}> - The number of days specified must be at least 2.`);
                else {
                    let dayDeathData = [];
                    let xAxisLabels = [];

                    let getDayHistoricDeaths = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/all?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - error`)
                            }
                        });
                        return data = response.data;
                    }
                    let historicDayDeaths = await getDayHistoricDeaths();
                    // Format x-axis labels and compile data to be used on graph
                    for (day in historicDayDeaths["deaths"]){
                        xAxisLabels.push("\"" + day + "\"");
                        dayDeathData.push(historicDayDeaths["deaths"][`${day}`])
                    }
                    // Create a new embedded message for the bot to display historic deaths for a specified number of days
                    const historicDeathEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Historic Deaths for the Past ${numDays} Days Globally`)
                        .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Deaths',data:[${dayDeathData}],fill:false,borderColor:"rgb(178,34,34)",pointBackgroundColor:"rgb(178,34,34)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicDeathEmbed);
                }
            }    
            // Country specific historic deaths for specified number of days
            else if (args.length >= 3 && typeof(parseFloat(args[1]) === 'number') && /^[a-zA-Z\s]*$/i.test(args.slice(2).join(" "))) {
                let countryName = args.slice(2).join(" ");
                let numDays = args[1];

                // Input validation - the number of days must be an integer between 2 and 100, inclusive
                if (!Number.isInteger(parseFloat(numDays)) && !isNaN(numDays))
                    return message.channel.send(`<@${message.author.id}> - Number of days must be a valid integer.`);
                else if (numDays > 100) 
                    return message.channel.send(`<@${message.author.id}> - I can only display data from up to the past 100 days.`);
                else if (numDays < 2) 
                    return message.channel.send(`<@${message.author.id}> - The number of days specified must be at least 2.`);
                else {
                    let countryDeathData = [];
                    let xAxisLabels = [];

                    let getCountryHistoricDeaths = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                            }
                        });
                        return data = response.data;
                    }
                    let historicCountryDeaths = await getCountryHistoricDeaths();
                    // Format x-axis labels and compile data to be used on graph
                    for (day in historicCountryDeaths["timeline"]["deaths"]){
                        xAxisLabels.push("\"" + day + "\"");
                        countryDeathData.push(historicCountryDeaths["timeline"]["deaths"][`${day}`])
                    }
                    // Create a new embedded message for the bot to display Country-specific historic deaths for a specified number of days
                    const historicDeathEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Historic Deaths for the Past ${numDays} Days in ${historicCountryDeaths["country"]}`)
                        .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Deaths',data:[${countryDeathData}],fill:false,borderColor:"rgb(178,34,34)",pointBackgroundColor:"rgb(178,34,34)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicDeathEmbed);
                } 
            } else 
                return message.channel.send(`<@${message.author.id}> - Command syntax is ` + "```" + "!deaths [historic/hs] [number of days] [name of country]" + "```");
        } else 
            return message.channel.send(`<@${message.author.id}> - Please enter a valid argument. Type !covhelp for help with commands.`);
    }
}
// Helper function that adds commas to large numbers using REGEX
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}