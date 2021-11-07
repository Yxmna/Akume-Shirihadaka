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
var version = "0.1.1";
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
Akume.on('interactionCreate', interaction => {
  if (!interaction.guild.me.permissionsIn(interaction.channel).toArray().includes("VIEW_CHANNEL") || !interaction.guild.me.permissionsIn(interaction.channel).toArray().includes("SEND_MESSAGES") || !interaction.guild.me.permissionsIn(interaction.channel).toArray().includes("EMBED_LINKS")) {
    let array = [];
    if (!interaction.guild.me.permissionsIn(interaction.channel).toArray().includes("VIEW_CHANNEL")) {
      array.push("<:CROSS:904511913491324939> Voir le salon (VIEW_CHANNEL)");
    } else {
      array.push("<:CHECK:904511902078619698> Voir le salon (VIEW_CHANNEL)");
    }
    if (!interaction.guild.me.permissionsIn(interaction.channel).toArray().includes("SEND_MESSAGES")) {
      array.push("<:CROSS:904511913491324939> Envoyer des messages (SEND_MESSAGES)");
    } else {
      array.push("<:CHECK:904511902078619698> Envoyer des messages (SEND_MESSAGES)");
    }
    if (!interaction.guild.me.permissionsIn(interaction.channel).toArray().includes("EMBED_LINKS")) {
      array.push("<:CROSS:904511913491324939> Intégrer des liens (EMBED_LINKS)");
    } else {
      array.push("<:CHECK:904511902078619698> Intégrer des liens (EMBED_LINKS)");
    }
    interaction.reply({
      content: "Je n'ai pas la permission de voir et/ou d'écrire et/ou d'intégrer des liens dans ce salon\n" + array.join("\n"),
      ephemeral: true
    })
    return;
  };
  if (!interaction.isCommand()) return;
  // console.log("INTERACTION: " + interaction.commandName);
  let props = {
    interaction: interaction,
    functions: functions,
    config: config,
    version: version,
    buttons: MessageButton,
    actionrow: MessageActionRow,
    akume: Akume,
    categorys: categorys
  }
  Akume.commands.get(interaction.commandName).execute(props);
});
// ----------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------
// MESSAGE RECU
Akume.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content == "<@!" + Akume.user.id + ">") {
    if (!message.guild.me.permissionsIn(message.channel).toArray().includes("VIEW_CHANNEL") || !message.guild.me.permissionsIn(message.channel).toArray().includes("SEND_MESSAGES") || !message.guild.me.permissionsIn(message.channel).toArray().includes("EMBED_LINKS")) {
      let array = [];
      if (!message.guild.me.permissionsIn(message.channel).toArray().includes("VIEW_CHANNEL")) {
        array.push("<:CROSS:904511913491324939> Voir le salon (VIEW_CHANNEL)");
      } else {
        array.push("<:CHECK:904511902078619698> Voir le salon (VIEW_CHANNEL)");
      }
      if (!message.guild.me.permissionsIn(message.channel).toArray().includes("SEND_MESSAGES")) {
        array.push("<:CROSS:904511913491324939> Envoyer des messages (SEND_MESSAGES)");
      } else {
        array.push("<:CHECK:904511902078619698> Envoyer des messages (SEND_MESSAGES)");
      }
      if (!message.guild.me.permissionsIn(message.channel).toArray().includes("EMBED_LINKS")) {
        array.push("<:CROSS:904511913491324939> Intégrer des liens (EMBED_LINKS)");
      } else {
        array.push("<:CHECK:904511902078619698> Intégrer des liens (EMBED_LINKS)");
      }
      message.author.send({
        content: "Je n'ai pas la permission de voir et/ou d'écrire et/ou d'intégrer des liens dans <#" + message.channel.id + ">" + "\n" + array.join("\n")
      })
      return;
    };

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
  console.log("-------------------------------------------");
  console.log();
  // slashCommands();
})
// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------
// CONNEXION D'AKUME
Akume.login(token.key);
// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------
function slashCommands() {
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
  })
  let guildId;
  // guildId = "658715456768573470";
  // Akume.guilds.cache.get("658715456768573470").commands.set([]);
  // Akume.application.commands.set([]);
  const {
    REST
  } = require('@discordjs/rest');
  const {
    Routes
  } = require('discord-api-types/v9');
  const rest = new REST({
    version: '9'
  }).setToken(token.key);
  (async () => {
    try {
      if (guildId) {
        await rest.put(
          Routes.applicationGuildCommands(Akume.application.id, guildId), {
            body: Akume.commands
          },
        );
      } else {
        await rest.put(
          Routes.applicationCommands(Akume.application.id), {
            body: Akume.commands
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  })();
}
// ----------------------------------------------------------------------------------
