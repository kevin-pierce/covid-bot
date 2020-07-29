const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
    name: "cases",
    description: "Provides daily-updated data on COVID-19 cases globally",
    async execute(message, args){
        // Global cases TOTAL
        if (!args.length) {
            let getTotalCases = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                let cases = response.data;
                return cases;
            }
            let totalCases = await getTotalCases();
            return message.channel.send(`Globally, there have been ${numberWithCommas(totalCases["cases"])} cases of COVID-19.`);
        }
        // Cases TODAY
        else if ((args[0] === "today" || args[0] === "td")) {
            // New global cases TODAY
            if (args.length == 1) {
                let getTodayCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    return data = response.data;
                }
                let todayCases = await getTodayCases();
                message.channel.send(`Today, there are ${numberWithCommas(todayCases["todayCases"])} new cases of COVID-19.`);
            }
            // Country-specific new cases TODAY
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getTodayCountryCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=false&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                        }
                    });
                    return data = response.data;
                }
                let todayCountryCases = await getTodayCountryCases();
                message.channel.send(`Today, there are ${numberWithCommas(todayCountryCases["todayCases"])} new cases of COVID-19 in ${todayCountryCases["country"]}.`);
            }
        }
        // Cases YESTERDAY
        else if (args[0] === "yesterday" || args[0] === "ytd") {
            // New global cases YESTERDAY
            if (args.length == 1) {
                let getYesterdayCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                    return cases = response.data;
                }
                let yesterdayCases = await getYesterdayCases();
                message.channel.send(`Yesterday, there were ${numberWithCommas(yesterdayCases["todayCases"])} new cases of COVID-19.`);
            }
            // New country-specific cases YESTERDAY
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getYesterdayCountryCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=true&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                        }
                    });
                    return cases = response.data;
                }
                let yesterdayCountryCases = await getYesterdayCountryCases();
                message.channel.send(`Yesterday, there were ${numberWithCommas(yesterdayCountryCases["todayCases"])} new cases of COVID-19 in ${yesterdayCountryCases["country"]}.`);
            }
            else {
                return message.channel.send(`<@${message.author.id}> - Invalid arguments. Please type !covhelp for help with commands.`);
            }
        }
        // HISTORIC Cases (Sends a graph)
        else if (args[0] === "historic" || args[0] === "hs") {
            // No specified number of days (defaulted to 30)
            if (args.length == 1) {
                let casesData = [];
                let xAxisLabels = [];

                let getHistoricCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                    return historicCases = response.data;
                }
                let globalHistoricCases = await getHistoricCases();
                // Format x-axis labels and compile data to be used on graph
                for (day in globalHistoricCases["cases"]){
                    xAxisLabels.push("\"" + day + "\"");
                    casesData.push(globalHistoricCases["cases"][`${day}`])
                }
                // Create a new embedded message for the bot to display historic cases
                const historicCasesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle("Daily Cases for the Past 30 Days Globally")
                    .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cases',data:[${casesData}],fill:true,backgroundColor:"rgba(255,160,122,0.4)",borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicCasesEmbed);
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
                    let dayCasesData = [];
                    let xAxisLabels = [];

                    let getDayHistoricCases = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/all?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - error`)
                            }
                        });
                        return data = response.data;
                    }
                    let globalDayHistoricCases = await getDayHistoricCases();
                    // Format x-axis labels and compile data to be used on graph
                    for (day in globalDayHistoricCases["cases"]){
                        xAxisLabels.push("\"" + day + "\"");
                        dayCasesData.push(globalDayHistoricCases["cases"][`${day}`])
                    }
                    // Create a new embedded message for the bot to display historic cases for a specified number of days
                    const historicCasesEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Daily Cases Trend for the Past ${numDays} Days Globally`)
                        .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cases',data:[${dayCasesData}],fill:true,backgroundColor:"rgba(255,160,122,0.4)",borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicCasesEmbed);
                }
            }
            // Country-specific cases trend for specified number of days
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
                    let countryCasesData = [];
                    let xAxisLabels = [];

                    let getCountryHistoricCases = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                            }
                        });
                        return data = response.data;
                    }
                    let historicCountryCases = await getCountryHistoricCases();
                    // Format x-axis labels and compile data to be used on graph
                    for (day in historicCountryCases["timeline"]["cases"]){
                        xAxisLabels.push("\"" + day + "\"");
                        countryCasesData.push(historicCountryCases["timeline"]["cases"][`${day}`])
                    }
                    // Create a new embedded message for the bot to display the Country-specific + day-specific historic cases
                    const historicCasesEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Daily Cases for the Past ${numDays} Days in ${historicCountryCases["country"]}`)
                        .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cases',data:[${countryCasesData}],fill:true,backgroundColor:"rgba(255,160,122,0.4)",borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicCasesEmbed);
                } 
            } else 
                return message.channel.send(`<@${message.author.id}> - Command syntax is ` + "```" + "!cases [historic/hs] [number of days] [name of country]" + "```");
        } else 
            return message.channel.send(`<@${message.author.id}> - Please enter a valid argument. Type !covhelp for help with commands.`);
    }
}       
// Helper function that adds commas to large numbers using REGEX
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}