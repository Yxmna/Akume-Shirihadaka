const default_config = require("../../default_config.json");
module.exports = {
  name: "config",
  description: "Voir les configurations du serveurs",
  options: [{
    name: "commandes",
    description: "Choisir la commande",
    type: 3,
    required: false,
    choices: [{
      name: "Démarrer la vérification",
      value: "vérification"
    }, {
      name: "Afficher l'aide",
      value: "aide"
    }]
  }, {
    name: "valeur-par-défaut",
    description: "Afficher les valeurs par défaut",
    type: 3,
    required: false,
    choices: [{
      name: "Afficher les valeurs par défaut",
      value: "oui"
    }, {
      name: "Ne pas afficher les valeurs par défaut",
      value: "non"
    }]
  }],
  category: "général",
  sample: "/config",
  accessableby: "all",
  status: 1,
  async execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const Akume = props.akume;
    const MessageButton = props.buttons;
    const MessageActionRow = props.actionrow;
    const int = props.interaction;
    const functions = props.functions;
    var channel_id = "channel_" + Math.floor(Math.random() * 100000);
    var value_id = "value_" + Math.floor(Math.random() * 100000);
    var misc_id = "misc_" + Math.floor(Math.random() * 100000);
    var embed_color = await functions.getConfigFor(int.guild, "help", "embed-color");
    var embed_image = await functions.getConfigFor(int.guild, "help", "embed-image");
    var guild_config = await functions.getConfigFor(int.guild, "all");
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CREATION DES EMBEDS
    var buttons = new MessageActionRow()
      .addComponents(new MessageButton()
        .setCustomId(channel_id)
        .setStyle('SECONDARY')
        .setLabel("Créé une configuration")
        .setDisabled(true))
      .addComponents(new MessageButton()
        .setCustomId(value_id)
        .setStyle('SECONDARY')
        .setLabel("Valeurs possibles"))
      .addComponents(new MessageButton()
        .setCustomId(misc_id)
        .setStyle('SECONDARY')
        .setLabel("Autres informations"))
    var embed = functions.createEmbed(embed_color, embed_image)
      .setTitle("<:SETTINGS_ICON:904516852082958396>  Configuration du serveur")
    var value_embed = functions.createEmbed(embed_color, embed_image)
      .setTitle("<:SETTINGS_ICON:904516852082958396>  Configuration du serveur")
      .setDescription("```Les différentes valeurs possibles```")
      .addField("<:akume_square:904397824190447737> `color`", "Définit l’émoji utilisé pour les dessins\nValeurs possibles: émoji ou \"random\"\nExemple: \n```color: 🟪```")
      .addField("<:akume_square:904397824190447737> `random`", "Définit la liste des émojis aléatoires lorsque la valeur \"random\" est utilisée\nValeurs possibles: liste d’émojis séparés par une virgule\nExemple: ```random: 🟨,🟪,🟥```")
      .addField("<:akume_square:904397824190447737> `size`", "Définit la taille des dessins\nValeurs possibles: chiffre (max 25 conseillé)\nExemple\n```size: 16```")
      .addField("<:akume_square:904397824190447737> `embed-color`", "Définit la couleur des embeds\nValeurs possibles: couleur (en hex, en chiffre, en texte ou rgb)\nExemple\n```embed-color: #2F3136```")
      .addField("<:akume_square:904397824190447737> `embed-image`", "Définit l'image a la fin des embeds\nValeurs possibles: liens vers une image\nExemple\n```embed-image: https://cdn.discordapp.com/avatars/613486608624254986/b5570691b8979be00a8ea8e38f1525cd.png```")
      .setFooter("Page 2/3");
    var misc_embed = functions.createEmbed(embed_color, embed_image)
      .setTitle("<:SETTINGS_ICON:904516852082958396>  Configuration du serveur")
      .setDescription("```Informations complémentaires```\n<:akume_square:904397824190447737> La catégorie `[general]` regroupe toutes les commandes mais n'a pas la priorité sur une catégorie spécifique\n<:akume_square:904397824190447737> Tous les paramètres sont optionnels, s'ils sont absents de la configuration, alors c'est la valeur par défaut qui prendra effet\n<:akume_square:904397824190447737> Les émojis personnalisé peuvent être utilisé, ils s'écrivent sous la forme `<nom_du_emoji:id_du_emoji:>`\n<:akume_square:904397824190447737> Les espaces après les deux points `:` sont importants\n<:akume_square:904397824190447737> Le paramètres `embed-color` peut perdre sa priorité avec la commande /profile ou /guild")
      .setFooter("Page 3/3");
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    if (!int.options.get("commandes") || int.options.get("commandes").value == "vérification") {
      verification();
    } else if (int.options.get("commandes") && int.options.get("commandes").value == "aide") {
      displayHelp(true);
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // FONCTION D'AIDE
    function displayHelp(finded) {
      if (finded) {
        embed.setDescription("```Aide pour la configuration d'Akume sur votre serveur```Pour configurer Akume suivez les étapes:")
      } else {
        embed.setDescription("```Aucune configuration n'est trouvé sur votre serveur```Pour configurer Akume suivez les étapes:")
      }
      embed
        .addField("Etape 1", "Créer une salon textuelle avec `akume-config` dans le nom")
        .addField("Etape 2", "Envoyez dans le salon le message suivant : (ce sont des valeurs pas défault) \n```\n" + "```ini\n[general]\ncolor: random\nsize: 14\nrandom: 🟥,🟧,🟨,🟩,🟦,🟪,🟫\n\n[poll]\ncolor: random\nsize: 14\nrandom: 🟥,🟧,🟨,🟩,🟦,🟪,🟫\n`` `" + " ```⚠ Attention, l'espace avant le dernier `` ` dois être retiré")
        .addField("Etape 3", "Éditez votre message pour y entrer vos valeurs")
        .addField("Note:", "Utilisez `/config aide` pour afficher cette aide")
        .setFooter("Page 1/3");
      int.reply({
        embeds: [embed],
        components: [buttons]
      })
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // FONCTION DE VERIFICATION
    function verification() {
      let number = 0;
      var channel = int.guild.channels.cache.find(c => c.name.includes('akume-config'));
      if (channel) {
        embed
          .setDescription("```Salon de configuration détécté !```")
          .addField("Chargement des valeurs ...", "_ _")
          .fields = [];
        for (var cmd in default_config) {
          let keys = []
          for (var key in default_config[cmd]) {
            let value;
            if (guild_config[cmd] && guild_config[cmd][key]) {
              number++;
              value = "**" + guild_config[cmd][key] + "**";
              key = "**" + key + "**";
            } else {
              if (int.options.get("valeur-par-défaut") && int.options.get("valeur-par-défaut").value == "oui") {
                if (default_config[cmd][key] != "") {
                  value = "_" + default_config[cmd][key] + "_";
                } else {
                  value = "";
                }
                key = "_" + key + "_";
              } else {
                value = "_défaut_";
                key = "_" + key + "_";
              }
            }
            keys.push("<:test_emoji_1:860263483194081311> " + key + ": " + value);
          }
          if (cmd == "general") {
            embed.addField("Toutes les commandes", keys.join("\n"))
          } else {
            embed.addField("Commande `/" + cmd + "`", keys.join("\n"))
          }
        }
        if (number > 1) {
          embed.setFooter(number + " configurations modifiées")
        } else {
          embed.setFooter(number + " configuration modifiée")
        }
        int.reply({
          embeds: [embed]
        })
      } else {
        displayHelp();
      }
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // SI INTERACTION
    Akume.on('interactionCreate', async interaction => {
      if (interaction.componentType !== "BUTTON") return;
      functions.enableAllButtons(buttons.components);
      switch (interaction.customId) {
        case channel_id:
          buttons.components[0].setDisabled(true);
          interaction.message.edit({
            embeds: [embed],
            components: [buttons]
          })
          interaction.deferUpdate();
          break;
        case value_id:
          buttons.components[1].setDisabled(true);
          interaction.message.edit({
            embeds: [value_embed],
            components: [buttons]
          })
          interaction.deferUpdate();
          break;
        case misc_id:
          buttons.components[2].setDisabled(true);
          interaction.message.edit({
            embeds: [misc_embed],
            components: [buttons]
          })
          interaction.deferUpdate();
          break;
      }
    });
    // ----------------------------------------------------------------------------------
  }
}
