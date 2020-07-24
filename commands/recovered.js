const axios = require("axios");

module.exports = {
    name: "recovered",
    description: "Provides daily-updated data on COVID-19 case recoveries globally",
    async execute(message, args) {
        // Sends a message about how many people have recovered thus far
        if (!args.length) {
            let getTotalRecovered = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                return recovered = response.data;
            }
            let totalRecovered = await getTotalRecovered();
            return message.channel.send(`Globally, ${totalRecovered["recovered"]} people have recovered from COVID-19.`)
        }
    }
}