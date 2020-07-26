const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
    name: "deaths",
    description: "Provides daily-updated data on COVID-19 related deaths globally",
    async execute(message, args){
                // Global death cases TOTAL
                if (!args.length) {
                    let getTotalDeaths = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                        let deaths = response.data;
                        return deaths;
                    }
                    let totalDeaths = await getTotalDeaths();
                    return message.channel.send(`Globally, ${totalDeaths["deaths"]} people have died due to COVID-19.`);
                }
                // The user narrows their search for TODAY
                else if (args[0] === "today" || args[0] === "td") {
                    // Global deaths TODAY
                    if (args.length == 1) {
                        let getDeaths = async () => {
                            let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                            let deaths = response.data;
                            return deaths;
                        }
                        let info = await getDeaths();
                        
                        console.log(info["todayDeaths"]);
                        message.channel.send(`Today, ${info["todayDeaths"]} people have died.`);
                    }
                    // Country-specific deaths TODAY
                    else if (args.length >= 2) {
                        let totalTodayDeathsCountry = 0;
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
                        totalTodayDeathsCountry = info["todayDeaths"];
                        
                        console.log(totalTodayDeathsCountry);
                        message.channel.send(`Today, ${totalTodayDeathsCountry} people have died.`);
                    }
                }
                // The user specifies their search for YESTERDAY
                else if (args[0] === "yesterday" || args[0] === "ytd") {
                    // Global deaths YESTERDAY
                    if (args.length == 1) {
                        let getDeaths = async () => {
                            let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                            return deaths = response.data;
                        }
                        let info = await getDeaths();
                        
                        console.log(info["todayDeaths"]);
                        message.channel.send(`Yesterday, ${info["todayDeaths"]} people died.`);
                    }
                    // Country-specific deaths YESTERDAY
                    else if (args.length >= 2) {
                        let totalYTDDeathsCountry = 0;
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
                        totalYTDDeathsCountry = info["todayDeaths"];
                        
                        console.log(totalYTDDeathsCountry);
                        message.channel.send(`Yesterday, ${totalYTDDeathsCountry} people died in ${info["country"]}.`);
                    }
                }
                // The user specifies their search for YESTERDAY (This argument returns a GRAPH)
                else if (args[0] === "historic" || args[0] === "hs") {
        
                    // No specification on how far back the data goes (Simply 30 days)
                    if (args.length == 1) {
        
                        let getHistoricDeaths = async () => {
                            let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                            return historicDeaths = response.data;
                        }
                        let info = await getHistoricDeaths();
        
                        let deathData = [];
                        let xAxisLabels = [];

                        // Format x-axis labels and compile data to be used on graph
                        for (day in info["deaths"]){
                            xAxisLabels.push("\"" + day + "\"");
                            deathData.push(info["deaths"][`${day}`])
                        }
                        console.log(xAxisLabels);
        
                        // Create a new embedded message for the bot to display the historic deaths
                        const historicDeathEmbed = new Discord.MessageEmbed()
                            .setColor("#990000")
                            .setTitle("Historic Deaths for the Past 30 Days Globally")
                            .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Deaths',data:[${deathData}],fill:false,borderColor:"red",pointBackgroundColor:"red"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                        return message.channel.send(historicDeathEmbed);
                    }
                    // Country specific historic deaths
                    else if (args.length == 2) {
                        let countryName = args.slice(1).join(" ");
                        console.log(countryName);

                        let getCountryHistoricDeaths = async () => {
                            let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=30").catch(err =>{
                                if (err.response){
                                    message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                                }
                            });
                            return data = response.data;
                        }
                        let historicCountryDeaths = await getCountryHistoricDeaths();
                        
                        let countryDeathData = [];
                        let xAxisLabels = [];

                        // Format x-axis labels and compile data to be used on graph
                        for (day in historicCountryDeaths["timeline"]["deaths"]){
                            xAxisLabels.push("\"" + day + "\"");
                            countryDeathData.push(historicCountryDeaths["timeline"]["deaths"][`${day}`])
                        }
                        
                        // Create a new embedded message for the bot to display the Country-specific historic deaths
                        const historicDeathEmbed = new Discord.MessageEmbed()
                            .setColor("#990000")
                            .setTitle(`Historic Deaths for the Past 30 Days in ${historicCountryDeaths["country"]}`)
                            .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Deaths',data:[${countryDeathData}],fill:false,borderColor:"red",pointBackgroundColor:"red"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                        return message.channel.send(historicDeathEmbed);
                    }
                    // Country specific historic deaths for certain days
                    else if (args.length == 3) {
                        let countryName = args.slice(1,2).join(" ");
                        let numDays = args.slice(2).join(" ");
                        console.log(countryName);
                        console.log(numDays);

                        let getCountryHistoricDeaths = async () => {
                            let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                                if (err.response){
                                    message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                                }
                            });
                            return data = response.data;
                        }
                        let historicCountryDeaths = await getCountryHistoricDeaths();
                        
                        let countryDeathData = [];
                        let xAxisLabels = [];

                        // Format x-axis labels and compile data to be used on graph
                        for (day in historicCountryDeaths["timeline"]["deaths"]){
                            xAxisLabels.push("\"" + day + "\"");
                            countryDeathData.push(historicCountryDeaths["timeline"]["deaths"][`${day}`])
                        }
                        
                        // Create a new embedded message for the bot to display the Country-specific historic deaths
                        const historicDeathEmbed = new Discord.MessageEmbed()
                            .setColor("#990000")
                            .setTitle(`Historic Deaths for the Past ${numDays} Days in ${historicCountryDeaths["country"]}`)
                            .setImage(`https://quickchart.io/chart?width=500&height=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Deaths',data:[${countryDeathData}],fill:false,borderColor:"red",pointBackgroundColor:"red"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                        return message.channel.send(historicDeathEmbed);
                    }
                }
            }
    }

let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];