const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767})
const config = require("./config.json")

client.login(config.token)
client.on('ready', () =>{
console.log("Olá, fiquei on!")
client.user.setActivity("Um simples bot")

})
module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
client.login(client.config.token);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);




client.on("interactionCreate", async (interaction) => {
  
    if (interaction.isCommand()) {

        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);




        
       


 const { owners } = require("./config.json");
 if (cmd) {
  if (cmd.ownerOnly) {
 if (!owners.includes(interaction.user.id)) {
 let ownerOnly = new Discord.MessageEmbed()
  .setDescription( "*Somente meu dono pode usar isso!*" )
  return interaction.followUp({embeds : [ownerOnly] });
 }}
 }
        if (!cmd)
            return interaction.followUp({ content: "Ixi, muitos erro poucas soluções" });

        const args = [];
        let logs_cc = client.channels.cache.get("905802081334591498")
        let logs = new Discord.MessageEmbed()
        .setTitle("Um novo mebro usou um comando meu!")
        .setColor(config.embed)
        .addField("Membro", `\`${interaction.user} // ${interaction.user.id}\``)
        .addField("Guild", `\`${interaction.guild} // ${interaction.guild.id}\``);

        logs_cc.send({embeds: [logs]})



        for (let option of interaction.options.data) {


            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
   

        cmd.run(client, interaction, args);
    }


    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
        
    }
});
