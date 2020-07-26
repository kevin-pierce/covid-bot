const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
    name: "leaderboard",
    description: "Provides a top-10 ranking for each Country in each respective category",
    async execute(message, args){

        let leadingDeaths = [];
        let leadingRecoveries = [];
        let leadingCases = [];

        if (!args.length){
            let getCovData = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/countries?yesterday&sort");
                let data = response.data;
                return data;
            }
            let countryData = await getCovData();

            // Only take the top ~20 countries data for each comparison
            for (country in countryData){
                if (countryData[country]["deaths"] > 5000) leadingDeaths.push(countryData[country]);
                if (countryData[country]["recovered"] > 80000) leadingRecoveries.push(countryData[country]);
                if (countryData[country]["cases"] > 150000) leadingCases.push(countryData[country]);
            }
            // Sort the arrays
            leadingDeaths.sort(compareDeaths);
            leadingRecoveries.sort(compareRecoveries);
            leadingCases.sort(compareCases);
        }
    }
}

let compareDeaths = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const countryA = a["deaths"]
    const countryB = b["deaths"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}

let compareRecoveries = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const countryA = a["recovered"]
    const countryB = b["recovered"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}

let compareCases = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const countryA = a["cases"]
    const countryB = b["cases"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}  