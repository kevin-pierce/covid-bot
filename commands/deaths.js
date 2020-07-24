const axios = require("axios");

module.exports = {
    name: "deaths",
    description: "Provides daily-updated data on COVID-19 related deaths globally",
    async execute(message, args){
                // Display the total global deaths due to COVID-19 thus far
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
                        let totalTodayDeaths = 0;
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
        
                else if (args[0] === "historic" || args[0] === "hs") {
        
                    if (args.length == 1) {
        
                        let getHistoricDeaths = async () => {
                            let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                            return historicDeaths = response.data;
                        }
                        let info = await getHistoricDeaths();
        
                        let deathData = [];
                        let xAxisLabels = [];
        
                        // Must refactor dates later
                        for (day in info["deaths"]){
                            let tempDate = new Date(day);
                            xAxisLabels.push((monthArr[tempDate.getMonth().toString()] + tempDate.getDate().toString()));
                            deathData.push(info["deaths"][`${day}`])
                        }
                        console.log(xAxisLabels);
                        console.log(deathData);
        
                        // Create a new embedded message for the bot to display the historic deaths
                        const historicDeathEmbed = new Discord.MessageEmbed()
                            .setColor("#990000")
                            .setTitle("Historic Deaths for Past 30 Days")
                            .setImage(`https://quickchart.io/chart?c={type:'line',data:{datasets:[{label:'Deaths',data:[{x:${xAxisLabels},y:${deathData}}],fill:false,borderColor:"red",pointBackgroundColor:"red"}]},options:{scales:{xAxes:[{type:'time',distribution:'series',time:{unit:'day'}}]}}}`)
        
                        // for (day in info["deaths"]) {
                        //     botMsg += (day + ": " + info["deaths"][`${day}`] + " \n");
                        // }
                        //return message.channel.send(`Here are the statistics for the past 30 days: ${botMsg}`);
                        return message.channel.send(historicDeathEmbed);
                    }
                }
            }
    }

let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];