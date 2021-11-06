module.exports = {
  name: "help",
  description: "Afficher l'aide",
  options: [{
    name: "commande",
    type: 3,
    description: "Afficher l'aide d'une commande en particulier",
    required: false,
    choices: []
  }],
  category: "général",
  sample: "/help `commande:avatar`",
  accessableby: "all",
  status: 1,
  async execute(props, int_button) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const int = props.interaction;
    const Akume = props.akume;
    const MessageButton = props.buttons;
    const MessageActionRow = props.actionrow;
    const functions = props.functions;
    const categorys = props.categorys;
    var buttons_ids = {};
    var buttons;
    var sendAllCommands_id = "allcommands_" + Math.floor(Math.random() * 100000);
    var akumeInfo_id = "allcommands_" + Math.floor(Math.random() * 100000);
    var legend_id = "legend_" + Math.floor(Math.random() * 100000);
    var embed_color = await functions.getConfigFor(int.guild, "help", "embed-color");
    var embed_image = await functions.getConfigFor(int.guild, "help", "embed-image");
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // SI TOUTES LES COMMANDES
    if (int.options && int.options.get("commande") && int.options.get("commande").value == "toutes_les_commandes" || int_button) {
      buttons = new MessageActionRow()
      categorys.forEach((category, i) => {
        buttons_ids[category] = category + "_" + Math.floor(Math.random() * 100000);
        buttons.addComponents(new MessageButton()
          .setCustomId(buttons_ids[category])
          .setStyle('SECONDARY')
          .setLabel(category.charAt(0).toUpperCase() + category.slice(1)))
      });
      buttons.addComponents(new MessageButton()
        .setCustomId(legend_id)
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
      const command_embed = functions.createEmbed(embed_color, embed_image)
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
            case 3:
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
        // .setAuthor()
        .setTitle("<:HELP_ICON:904516839403585546>  Aide pour la commande " + command.name.toUpperCase() + "\n\n`/" + command.name + "` " + options.join(" "))
        .setDescription(command.description + "\n _  _ ")
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
          .setCustomId(sendAllCommands_id)
          .setLabel("Toutes les commandes")
          .setStyle("SECONDARY"))
        .addComponents(new MessageButton()
          .setCustomId(akumeInfo_id)
          .setLabel("Informations sur Akume")
          .setStyle("SECONDARY"))
      const help_embed = functions.createEmbed(embed_color, embed_image)
        .setTitle("<:HELP_ICON:904516839403585546>  Page d'aide")
        .setFooter("Akume Shirihadaka version BETA")
        .addField("Pour utiliser les commandes", "<:test_emoji_1:860263483194081311> Commencez par faire `/`, une liste de toutes les commandes disponibles sur votre serveur sera désormais affichée\nCliquez ensuite sur l'avatar d'Akume pour scroller automatiquement au bon endroit")
        .addField("Pour obtenir toutes les commandes", "<:test_emoji_1:860263483194081311> Utilisez la commande: `/help Toutes les commandes`")
        .setDescription("Salut " + int.member.displayName + " !\nJe suis Akume Shirihadaka<:BOT1:904526926360748063><:BOT2:904526955372753009>, un bot crée par Yomna")
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
      let embed = functions.createEmbed(embed_color, embed_image)
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
          status = "<:CROSS:904511913491324939>";
        } else if (command.status == 1) {
          status = "<:CHECK:904511902078619698>";
        } else {
          status = "<:BUGHUNTER_LEVEL_1:904494049975738409>";
        }
        embed.addField("<:akume_square:904397824190447737> `/" + command.name + "` " + options.join(" ") + " " + status, "<:test_emoji_1:860263483194081311> " + command.description)
      });
      categorys.forEach((item, i) => {
        if (category == item) page = (i + 1);
      });
      embed
        .setTitle("<:COMMAND_ICON:904528247587487815>  Liste de toutes les commandes", "https://media.discordapp.net/attachments/681838885000577041/683342502157484186/Sans_titre-1.png")
        .setDescription("``` Catégorie: " + category + " (" + commands.size + " commandes)```   _ _")
        .setFooter("Page " + page + "/" + (categorys.length + 1) + " • " + category);
      buttons.components[page - 1].setDisabled(true);
      return embed;
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // SI INTERACTION
    Akume.on('interactionCreate', async interaction => {
      if (interaction.componentType !== "BUTTON") return;

      if (interaction.customId == sendAllCommands_id) {
        Akume.commands.get("help").execute(props, true);
        interaction.deferUpdate();
      }
      if (interaction.customId == akumeInfo_id) {
        Akume.commands.get("about").execute(props, true);
        interaction.deferUpdate();
      }
      if (interaction.customId == legend_id) {
        const legend_embed = functions.createEmbed(embed_color, embed_image)
          .setTitle("<:HELP_ICON:904516839403585546>  Légende")
          .setDescription("``` Catégorie: légende```")
          .addField("<:akume_square:904397824190447737> `nom_de_la_commande` `arguements_de_la_commande`", "<:test_emoji_1:860263483194081311> Description_de_la_commande")
          .addField("Statut possible des commandes", "<:CHECK:904421039952502844>: La commande fonctionne correctement\n<:CROSS:904421050614419527>: La commande ne fonctionne plus ou n'est plus disponibles\n<:BUGHUNTER_LEVEL_1:904494049975738409>: La commande ne fonctionne plus correctement et/ou est en cours de développement/correction")
          .setFooter("Page 4/4 • légende")
        functions.enableAllButtons(buttons.components);
        buttons.components[3].setDisabled(true);
        interaction.message.edit({
          embeds: [legend_embed],
          components: [buttons]
        }).catch(function(e) {
          console.log(e);
        })
        interaction.deferUpdate();
      }
      let ifHelpButton = false;
      for (var i = 0; i < Object.values(buttons_ids).length; i++) {
        if (Object.entries(buttons_ids)[i][1] == interaction.customId) {
          ifHelpButton = true;
        }
      }
      if (!ifHelpButton) return;
      if (!Object.values(buttons_ids).indexOf(interaction.customId) > -1) {
        functions.enableAllButtons(buttons.components)
        interaction.message.edit({
          embeds: [commandsByCategory(interaction.customId.split("_")[0])],
          components: [buttons]
        }).then(function() {
          interaction.deferUpdate();
        })
      }
    });
    // ----------------------------------------------------------------------------------
  },
};
