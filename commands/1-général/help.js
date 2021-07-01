module.exports = {
  name: "help",
  description: "Affiche l'aide",
  options: [{
    name: "commande",
    type: "STRING",
    description: "Affiche l'aide d'une commande en particulier",
    required: false,
    choices: []
  }],
  fullname: "Aide",
  category: "général",
  sample: "/help `commande:avatar`",
  accessableby: "all",
  status: 1,
  execute(props, int_button) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const int = props.interaction;
    const Discord = props.discord;
    const Akume = props.akume;
    const MessageButton = props.buttons;
    const MessageActionRow = props.actionrow;
    const functions = props.functions;
    const categorys = props.categorys;
    var buttons_ids = {};
    var buttons;
    var sendAllCommands_id = "allcommands_" + Math.floor(Math.random() * 100000)
    var legend_id = "legend_" + Math.floor(Math.random() * 100000)
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // SI TOUTES LES COMMANDES
    if (int.options && int.options.get("commande") && int.options.get("commande").value == "toutes_les_commandes" || int_button) {

      buttons = new MessageActionRow()
      categorys.forEach((category, i) => {
        buttons_ids[category] = category + "_" + Math.floor(Math.random() * 100000);
        buttons.addComponents(new MessageButton()
          .setCustomID(buttons_ids[category])
          .setStyle('SECONDARY')
          .setLabel(category.charAt(0).toUpperCase() + category.slice(1)))
      });
      buttons.addComponents(new MessageButton()
        .setCustomID(legend_id)
        .setStyle('SECONDARY')
        .setLabel("Légende"))

      if (!int_button) {
        int.reply({
          embeds: [commandsByCategory("général")],
          components: [buttons]
        })
      } else {
        int.channel.send({
          embeds: [commandsByCategory("général")],
          components: [buttons]
        })
      }
      // ----------------------------------------------------------------------------------

      // ----------------------------------------------------------------------------------
      // SI JUSTE UNE COMMANDE
    } else if (int.options && int.options.get("commande")) {
      let command = Akume.commands.get(int.options.get("commande").value)
      const command_embed = functions.createEmbed()
      let options = [];
      if (command.options) {
        for (var i = 0; i < command.options.length; i++) {
          let option = command.options[i];
          if (option.required) {
            options.push("`<" + option.name + ">`");
          } else {
            options.push("`(" + option.name + ")`");
          }
          let type;
          switch (option.type) {
            case "STRING":
              type = "texte";
              break;
            case "INTEGER":
              type = "chiffre";
              break;
            case "USER":
              type = "@utilisateur ou ID"
              break;
          }
          let required = "\n<:test_emoji_1:860263483194081311> Facultatif";
          if (option.required) {
            required = "\n<:test_emoji_1:860263483194081311> **Obligatoire**"
          }
          let choices = "";
          if (option.choices) {
            choices = "\n <:test_emoji_1:860263483194081311> Choix: " + option.choices.map(option => "`" + option.value + "`").join(" ");
          }
          command_embed.addField(option.name, option.description + required + "\n <:test_emoji_1:860263483194081311> Type: " + type + choices)
        }
      }
      command_embed
        .setAuthor("Aide pour la commande " + command.name.toUpperCase(), "https://media.discordapp.net/attachments/681838885000577041/683342502157484186/Sans_titre-1.png")
        .setTitle("`/" + command.name + "` " + options.join(" "))
        .setDescription(command.description)
        .addField("Exemple", command.sample)
      int.reply({
        embeds: [command_embed]
      })
      // ----------------------------------------------------------------------------------

      // ----------------------------------------------------------------------------------
      // SI PAGE D'AIDE
    } else {
      buttons = new MessageActionRow()
        .addComponents(new MessageButton()
          .setCustomID(sendAllCommands_id)
          .setLabel("Afficher toutes les commandes")
          .setStyle("SECONDARY"))
        .addComponents(new MessageButton()
          .setStyle("LINK")
          .setLabel("Github")
          .setURL("https://github.com/Yxmna/Akume-Shirihadaka"))
        .addComponents(new MessageButton()
          .setStyle("LINK")
          .setLabel("Wiki")
          .setURL("https://github.com/Yxmna/Akume-Shirihadaka/wiki"))
      const help_embed = functions.createEmbed()
        .setTitle("Page d'aide")
        .setFooter("Akume Shirihadaka version BETA")
        .addField("Pour utiliser les commandes", "<:test_emoji_1:860263483194081311> Commencez par faire `/`, une liste de toutes les commandes disponibles sur votre serveur sera désormais affichée\n<:test_emoji_1:860263483194081311> Cliquez sur l'avatar d'Akume pour scroller automatiquement au bon endroit")
        .addField("Pour obtenir toutes les commandes", "<:test_emoji_1:860263483194081311> Utilisez la commande: `/help command:toutes_les_commandes`")
        .setDescription("Salut " + int.member.displayName + " !\nJe suis Akume Shirihadaka<:BOT_1:859936950717513751><:BOT_2:859936960160464937>, un bot crée par Yomna")
        .setImage("")
      int.reply({
        embeds: [help_embed],
        components: [buttons]
      })
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CREATION DE L'EMBED SELON LA CATEGORIE
    function commandsByCategory(category) {
      let embed = functions.createEmbed()
      let page = 0;
      let commands = Akume.commands.filter(command => command.category == category);
      commands.forEach((command, i) => {
        let options = [];
        if (command.options && command.options.length < 5) {
          for (var i = 0; i < command.options.length; i++) {
            let option = command.options[i];
            if (option.required) {
              options.push("`<" + option.name + ">`");
            } else {
              options.push("`(" + option.name + ")`");
            }
          }
        } else if (command.options && command.options.length > 5) {
          options.push("`[...]`");
        }
        let status = 0;
        if (command.status == 0) {
          status = "<:akume_cross:750746914391326883>";
        } else if (command.status == 1) {
          status = "<:akume_check:750755161839763476>";
        } else {
          status = "<:BUGHUNTER_LEVEL_1:859928844331647066>";
        }
        embed.addField("<:akume_grey_medium_square:750658712905187378> `/" + command.name + "` " + options.join(" ") + " " + status, "<:test_emoji_1:860263483194081311> " + command.description)
      });
      categorys.forEach((item, i) => {
        if (category == item) page = (i + 1);
      });
      embed
        .setTitle("Liste de toutes les commandes", "https://media.discordapp.net/attachments/681838885000577041/683342502157484186/Sans_titre-1.png")
        .setDescription("``` Catégorie: " + category + " (" + commands.size + " commandes)```   _ _")
        .setFooter("Page " + page + "/" + (categorys.length + 1) + " • " + category)
      buttons.components[page - 1].setDisabled(true)
      return embed;
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // SI INTERACTION
    Akume.on('interaction', interaction => {
      if (interaction.componentType !== "BUTTON") return;

      if (interaction.customID == sendAllCommands_id) {
        Akume.commands.get("help").execute(props, true);
        interaction.deferUpdate();
      }

      if (interaction.customID == legend_id) {

        const legend_embed = functions.createEmbed()
          .setTitle("Légende")
          .setDescription("``` Catégorie: légende```")
          .addField("<:akume_grey_medium_square:750658712905187378> `nom_de_la_commande` `arguements_de_la_commande`", "<:test_emoji_1:860263483194081311> Description_de_la_commande")
          .addField("Statut possible des commandes", "<:akume_check:750755161839763476>: La commande fonctionne correctement\n<:akume_cross:750746914391326883>: La commande ne fonctionne plus ou n'est plus disponibles\n<:BUGHUNTER_LEVEL_1:859928844331647066>: La commande ne fonctionne plus correctement et/ou est en cours de développement/correction")
          .setFooter("Page 4/4 • légende")
        functions.enableAllButtons(buttons.components);
        buttons.components[3].setDisabled(true)
        interaction.message.edit({
          embeds: [legend_embed],
          components: [buttons]
        })
        interaction.deferUpdate();
      }

      let ifHelpButton = false;
      for (var i = 0; i < Object.values(buttons_ids).length; i++) {
        if (Object.entries(buttons_ids)[i][1] == interaction.customID) {
          ifHelpButton = true;
        }
      }
      if (!ifHelpButton) return;

      if (!Object.values(buttons_ids).indexOf(interaction.customID) > -1) {
        functions.enableAllButtons(buttons.components)
        interaction.message.edit({
          embeds: [commandsByCategory(interaction.customID.split("_")[0])],
          components: [buttons]
        }).then(function() {
          interaction.deferUpdate();
        })
      }

    });
    // ----------------------------------------------------------------------------------

  },
};
