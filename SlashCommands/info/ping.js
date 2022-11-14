const Discord = require("discord.js")


module.exports =  {
    name: "ping",
    description: "Veja meu ping",
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
    


    interaction.followUp({content: `Meu ping é ${client.ws.ping}`})



}

}