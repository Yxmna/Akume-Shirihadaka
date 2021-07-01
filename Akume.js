// ----------------------------------------------------------------------------------
// VARIABLES
const Discord = require('discord.js');
const {
  MessageActionRow,
  MessageButton
} = require("discord.js");
const Akume = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', "GUILD_PRESENCES"],
  allowedMentions: {
    repliedUser: false
  }
});
Akume.commands = new Discord.Collection();
const fs = require('fs');
const categorys = fs.readdirSync("./commands").map(category => category.split("-")[1]);
const token = require('./key.json');
const config = require('./config.json');
const functions = require("./functions.js");
// var prefix = "";
var version = "1.0.0";
// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------
// ENREGISTREMENT DES COMMANDES
categorys.forEach((category, i) => {
  let commandFiles = fs.readdirSync("./commands/" + (i + 1) + "-" + category).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require("./commands/" + (i + 1) + "-" + category + "/" + file);
    Akume.commands.set(command.name, command);
    console.log(file + " chargé");
  }
});
// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------
// INTERACTION RECU
Akume.on('interaction', interaction => {
  if (!interaction.guild.me.permissionsIn(interaction.channel).toArray().includes("VIEW_CHANNEL") || !interaction.guild.me.permissionsIn(interaction.channel).toArray().includes("SEND_MESSAGES")) {
    interaction.reply({
      content: "Je n'ai pas la permission de parler et/ou d'écrire dans ce salon",
      ephemeral: true
    })
    return;
  };
  if (!interaction.isCommand()) return;
  let props = {
    interaction: interaction,
    functions: functions,
    config: config,
    version: version,
    buttons: MessageButton,
    actionrow: MessageActionRow,
    discord: Discord,
    akume: Akume,
    categorys: categorys
  }
  Akume.commands.get(interaction.commandName).execute(props);
});
// ----------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------
// MESSAGE RECU
Akume.on('message', message => {
  if (message.author.bot) return;
  if (!message.guild.me.permissionsIn(message.channel).toArray().includes("VIEW_CHANNEL") || !message.guild.me.permissionsIn(message.channel).toArray().includes("SEND_MESSAGES")) return;
  if (message.content == "<@!" + Akume.user.id + ">") {
    let props = {
      interaction: message,
      functions: functions,
      config: config,
      version: version,
      buttons: MessageButton,
      actionrow: MessageActionRow,
      discord: Discord,
      akume: Akume,
      categorys: categorys
    }
    Akume.commands.get("help").execute(props);
  }
});
// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------
// AKUME PRET
Akume.on("ready", async () => {
  console.log("Akume est prète");
  console.log("----------------------------------------------------------------------------------");
  console.log();
  Akume.commands.each((command) => {
    if (command.name == "help") {
      command.options[0].choices = Akume.commands.map(function(cmd) {
        let obj = {
          name: cmd.name,
          value: cmd.name
        }
        return obj;
      })
      command.options[0].choices.push({
        name: "Toutes les commandes",
        value: "toutes_les_commandes"
      })
    }
    Akume.application.commands.create(command).then().catch(function(err) {
      console.log(err);
    })
    // Akume.guilds.cache.get("574238344121417729").commands.create(command);
  })
})
// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------
// CONNEXION D'AKUME
Akume.login(token.key);
// ----------------------------------------------------------------------------------
