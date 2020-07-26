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
                    .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${recoveryData}],fill:false,borderColor:"blue",pointBackgroundColor:"blue"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicRecoveriesEmbed);
            }
            // Country specific historic recoveries
            else if (args.length == 2) {
                let countryName = args.slice(1).join(" ");
                console.log(countryName);

                let getCountryHistoricRecoveries = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=30").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
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
                    console.log(countryRecoveryData);
                }
                
                // Create a new embedded message for the bot to display the Country-specific historic recoveries
                const historicRecoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Historic Deaths for the Past 30 Days in ${historicCountryRecoveries["country"]}`)
                    .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${countryRecoveryData}],fill:false,borderColor:"blue",pointBackgroundColor:"blue"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicRecoveredEmbed);
            }
            // Country specific historic recoveries for certain days
            else if (args.length == 3) {
                let countryName = args.slice(1,2).join(" ");
                let numDays = args.slice(2).join(" ");
                console.log(countryName);
                console.log(numDays);

                if (numDays > 100) {
                    return message.channel.send(`<@${message.author.id}> - I can only display data from up to the past 100 days.`)
                }
                else {
                    let getCountryHistoricRecoveries = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                return message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
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
                        .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${countryRecoveryData}],fill:false,borderColor:"blue",pointBackgroundColor:"blue"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)
    
                    return message.channel.send(historicRecoveriesEmbed);
                }                
            }
        }
    }
}