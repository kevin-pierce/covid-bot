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
            return message.channel.send(`Globally, ${numberWithCommas(totalRecovered["recovered"])} people have recovered from COVID-19.`);
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
                return message.channel.send(`Today, ${numberWithCommas(todayRecovered["todayRecovered"])} people have recovered from COVID-19.`);
            }
            // Country-specific recovered cases TODAY
            else if (args.length >= 2){
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
                return message.channel.send(`Today, ${numberWithCommas(todayRecoveredCountry["todayRecovered"])} people have recovered from COVID-19 in ${todayRecoveredCountry["country"]}.`);
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
                message.channel.send(`Yesterday, ${numberWithCommas(totalYTDRecovered["todayRecovered"])} people recovered from COVID-19.`);
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
                message.channel.send(`Yesterday, ${numberWithCommas(totalYTDCountryRecovered["todayRecovered"])} people recovered from COVID-19 in ${totalYTDCountryRecovered["country"]}.`);
            }
            else {
                return message.channel.send(`<@${message.author.id}> - Invalid arguments. Please type !covhelp for help with commands.`);
            }
        }
        // Data HISTORICALLY (This argument returns a GRAPH)
        else if (args[0] === "historic" || args[0] === "hs") {
            // No specification on how far back the data goes (Simply 30 days)
            if (args.length == 1) {

                let getHistoricRecoveries = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                    return data = response.data;
                }
                let historicRecoveries = await getHistoricRecoveries();

                let xAxisLabels = [];
                let recoveryData = [];

                // Format x-axis labels and compile data to be used on graph
                for (day in historicRecoveries["recovered"]){
                    xAxisLabels.push("\"" + day + "\"");
                    recoveryData.push((historicRecoveries["recovered"][`${day}`]));
                }
                console.log(xAxisLabels);

                // Create a new embedded message for the bot to display the historic recoveries
                const historicRecoveriesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle("COVID-19 Recoveries for the Past 30 Days Globally")
                    .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${recoveryData}],fill:false,borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicRecoveriesEmbed);
            }
            // Global recoveries historically for a specified number of days
            else if (args.length == 2 && typeof(parseFloat(args[1])) === 'number') {
                //let countryName = args.slice(1).join(" ");
                //console.log(countryName);

                let numDays = args[1];

                // Input validation - the number of days must be an integer between 2 and 100, inclusive
                if (!Number.isInteger(parseFloat(numDays)))
                    return message.channel.send(`<@${message.author.id}> - Number of days must be a valid integer.`);
                else if (numDays > 100)
                    return message.channel.send(`<@${message.author.id}> - I can only display data from up to the past 100 days.`);
                else if (numDays < 2)
                    return message.channel.send(`<@${message.author.id}> - The number of days specified must be at least 2.`);
                else {

                    let getDayHistoricRecoveries = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/all?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - error`)
                            }
                        });
                        return data = response.data;
                    }
                    let historicDayRecoveries = await getDayHistoricRecoveries();
                    
                    let dayRecoveryData = [];
                    let xAxisLabels = [];

                    // // Format x-axis labels and compile data to be used on graph
                    // for (day in historicCountryRecoveries["timeline"]["recovered"]){
                    //     xAxisLabels.push("\"" + day + "\"");
                    //     countryRecoveryData.push(historicCountryRecoveries["timeline"]["recovered"][`${day}`])
                    //     console.log(countryRecoveryData);
                    // }

                    // Format x-axis labels and compile data to be used on graph
                    for (day in historicDayRecoveries["recovered"]){
                        xAxisLabels.push("\"" + day + "\"");
                        dayRecoveryData.push(historicDayRecoveries["recovered"][`${day}`])
                    }
                    
                    // Create a new embedded message for the bot to display the Country-specific historic recoveries
                    const historicRecoveredEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Historic Deaths for the Past ${numDays} Days Globally`)
                        .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${dayRecoveryData}],fill:false,borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicRecoveredEmbed);
                }
            }
            // Country specific historic recoveries for certain days
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
                    let getCountryHistoricRecoveries = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                return message.channel.send(`<@${message.author.id}> - Please enter a valid country.`);
                            }
                        });
                        return data = response.data;
                    }
                    let historicCountryRecoveries = await getCountryHistoricRecoveries();
                    
                    let countryRecoveryData = [];
                    let xAxisLabels = [];
    
                    // Format x-axis labels and compile data to be used on graph
                    for (day in historicCountryRecoveries["timeline"]["recovered"]){
                        xAxisLabels.push("\"" + day + "\"");
                        countryRecoveryData.push(historicCountryRecoveries["timeline"]["recovered"][`${day}`])
                    }
                    
                    // Create a new embedded message for the bot to display the Country-specific historic deaths
                    const historicRecoveriesEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Historic Recoveries for the Past ${numDays} Days in ${historicCountryRecoveries["country"]}`)
                        .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${countryRecoveryData}],fill:false,borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)
    
                    return message.channel.send(historicRecoveriesEmbed);
                }                
            } else 
                return message.channel.send(`<@${message.author.id}> - Command syntax is ` + "```" + "!recovered [historic/hs] [number of days] [name of country]" + "```");
        } else 
            return message.channel.send(`<@${message.author.id}> - Please enter a valid argument. Type !covhelp for help with commands.`);
    }
}

// Helper function that adds commas to large numbers using REGEX
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}