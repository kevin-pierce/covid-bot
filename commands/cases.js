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
            console.log(totalCases);
            return message.channel.send(`Globally, there have been ${numberWithCommas(totalCases["cases"])} cases of COVID-19.`);
        }
        // Data for TODAY
        else if ((args[0] === "today" || args[0] === "td")) {
            // New cases TODAY
            if (args.length == 1) {
                let getTodayCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    return data = response.data;
                }
                let todayCases = await getTodayCases();
                
                console.log(todayCases["todayCases"]);
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
                
                console.log(todayCountryCases["todayCases"]);
                message.channel.send(`Today, there are ${numberWithCommas(todayCountryCases["todayCases"])} new cases of COVID-19 in ${todayCountryCases["country"]}.`);
            }
        }
        // The user specifies their search for YESTERDAY
        else if (args[0] === "yesterday" || args[0] === "ytd") {
            // Global cases YESTERDAY
            if (args.length == 1) {
                let getYesterdayCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                    return cases = response.data;
                }
                let yesterdayCases = await getYesterdayCases();
                
                message.channel.send(`Yesterday, there were ${numberWithCommas(yesterdayCases["todayCases"])} new cases of COVID-19.`);
            }
            // Country-specific cases YESTERDAY
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
                console.log(yesterdayCountryCases);

                message.channel.send(`Yesterday, there were ${numberWithCommas(yesterdayCountryCases["todayCases"])} new cases of COVID-19 in ${yesterdayCountryCases["country"]}.`);
            }
            else {
                return message.channel.send(`<@${message.author.id}> - Invalid arguments. Please type !covhelp for help with commands.`);
            }
        }
        // Data HISTORICALLY (This argument returns a GRAPH)
        else if (args[0] === "historic" || args[0] === "hs") {
        
            // No specification on how far back the data goes (Simply 30 days)
            if (args.length == 1) {

                let getHistoricCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                    return historicCases = response.data;
                }
                let globalHistoricCases = await getHistoricCases();

                let casesData = [];
                let xAxisLabels = [];

                // Format x-axis labels and compile data to be used on graph
                for (day in globalHistoricCases["cases"]){
                    xAxisLabels.push("\"" + day + "\"");
                    casesData.push(globalHistoricCases["cases"][`${day}`])
                }
                console.log(xAxisLabels);

                // Create a new embedded message for the bot to display the historic cases
                const historicCasesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle("Daily Cases for the Past 30 Days Globally")
                    .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cases',data:[${casesData}],fill:false,borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicCasesEmbed);
            }
            // Global cases historically for a specified number of days
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
                    let getDayHistoricCases = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/all?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - error`)
                            }
                        });
                        return data = response.data;
                    }
                    let globalDayHistoricCases = await getDayHistoricCases();
                    
                    let dayCasesData = [];
                    let xAxisLabels = [];

                    // // Format x-axis labels and compile data to be used on graph
                    // for (day in historicCountryDeaths["timeline"]["deaths"]){
                    //     xAxisLabels.push("\"" + day + "\"");
                    //     countryDeathData.push(historicCountryDeaths["timeline"]["deaths"][`${day}`])
                    // }

                    // Format x-axis labels and compile data to be used on graph
                    for (day in globalDayHistoricCases["cases"]){
                        xAxisLabels.push("\"" + day + "\"");
                        dayCasesData.push(globalDayHistoricCases["cases"][`${day}`])
                    }
                    
                    // Create a new embedded message for the bot to display the Country-specific historic deaths
                    const historicCasesEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Daily Cases for the Past ${numDays} Days Globally`)
                        .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cases',data:[${dayCasesData}],fill:false,borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicCasesEmbed);
                }
            }
            // Country specific historic deaths for certain days
            else if (args.length >= 3 && typeof(parseFloat(args[1]) === 'number') && /^[a-zA-Z\s]*$/i.test(args.slice(2).join(" "))) {
                let countryName = args.slice(2).join(" ");
                let numDays = args[1];

                if (!Number.isInteger(parseFloat(numDays)) && !isNaN(numDays))
                    return message.channel.send(`<@${message.author.id}> - Number of days must be a valid integer.`);
                else if (numDays > 100) 
                    return message.channel.send(`<@${message.author.id}> - I can only display data from up to the past 100 days.`);
                else if (numDays < 2) 
                    return message.channel.send(`<@${message.author.id}> - The number of days specified must be at least 2.`);
                else {
                    let getCountryHistoricCases = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                            }
                        });
                        return data = response.data;
                    }
                    let historicCountryCases = await getCountryHistoricCases();
                    
                    let countryCasesData = [];
                    let xAxisLabels = [];

                    // Format x-axis labels and compile data to be used on graph
                    for (day in historicCountryCases["timeline"]["cases"]){
                        xAxisLabels.push("\"" + day + "\"");
                        countryCasesData.push(historicCountryCases["timeline"]["cases"][`${day}`])
                    }
                    
                    // Create a new embedded message for the bot to display the Country-specific historic deaths
                    const historicCasesEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Daily Cases for the Past ${numDays} Days in ${historicCountryCases["country"]}`)
                        .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cases',data:[${countryCasesData}],fill:false,borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

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