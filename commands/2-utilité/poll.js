module.exports = {
  name: "poll",
  description: "Créer un sondage",
  options: [{
    name: "question",
    type: "STRING",
    description: "Choisi le titre ou la question du sondage",
    required: true,
  }, {
    name: "choix-1",
    type: "STRING",
    description: "Défini le 1er choix",
    required: true,
  }, {
    name: "choix-2",
    type: "STRING",
    description: "Défini le 2ème choix",
    required: true,
  }, {
    name: "choix-3",
    type: "STRING",
    description: "Défini le 3ème choix",
    required: false,
  }, {
    name: "choix-4",
    type: "STRING",
    description: "Défini le 4ème choix",
    required: false,
  }, {
    name: "choix-5",
    type: "STRING",
    description: "Défini le 5ème choix",
    required: false,
  }, {
    name: "choix-6",
    type: "STRING",
    description: "Défini le 6ème choix",
    required: false,
  }, {
    name: "choix-7",
    type: "STRING",
    description: "Défini le 7ème choix",
    required: false,
  }, {
    name: "choix-8",
    type: "STRING",
    description: "Défini le 8ème choix",
    required: false,
  }, {
    name: "choix-9",
    type: "STRING",
    description: "Défini le 9ème choix",
    required: false,
  }, {
    name: "type-de-sondage",
    type: "STRING",
    description: "Défini le type de sondage",
    required: false,
    choices: [{
      name: "multiple",
      value: "multiple"
    }, {
      name: "unique",
      value: "unique"
    }]
  }],
  fullname: "Sondage",
  category: "utilité",
  accessableby: "all",
  sample: "/poll `question:Aimez-vous Akume ?` `choix-1:Oui` `choix-2:Forcément` `choix-3:Évidemment` `choix-4:Bien sûr` `type-de-sondage:unique`",
  status: 1,
  async execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const int = props.interaction;
    const functions = props.functions;
    const MessageButton = props.buttons;
    const MessageActionRow = props.actionrow;
    const Akume = props.akume;
    // var buttons_ids = {};
    // let votes = {};
    var view_id = "view_" + Math.floor(Math.random() * 100000);
    var components = []
    var poll_emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
    // ----------------------------------------------------------------------------------


    // ----------------------------------------------------------------------------------
    // CREATION DES CHOIX
    let choices = [];
    for (var i = 0; i < int.options.size; i++) {
      if (int.options.get("choix-" + (i + 1))) {
        let obj = {
          value: int.options.get("choix-" + (i + 1)).value + " ",
          button_id: int.options.get("choix-" + (i + 1)).value + "_" + Math.floor(Math.random() * 100000),
          votes: []
        };
        choices.push(obj);
      }
    }
    // ----------------------------------------------------------------------------------


    // ----------------------------------------------------------------------------------
    // CREATION DES BOUTONS
    row_1 = new MessageActionRow()
    row_2 = new MessageActionRow()
    for (var i = 0; i < choices.length; i++) {
      if (i / 4 > 1) {
        row_2.addComponents(new MessageButton()
          .setCustomID(choices[i].button_id)
          .setStyle("PRIMARY")
          .setEmoji(poll_emojis[i]))
      } else {
        row_1.addComponents(new MessageButton()
          .setCustomID(choices[i].button_id)
          .setStyle("PRIMARY")
          .setEmoji(poll_emojis[i]))
      }
    }
    if ((choices.length + 1) > 5) {
      row_2.addComponents(new MessageButton()
        .setCustomID(view_id)
        .setStyle("SECONDARY")
        .setLabel("Mes votes"))
      components = [row_1, row_2]
    } else {
      row_1.addComponents(new MessageButton()
        .setCustomID(view_id)
        .setStyle("SECONDARY")
        .setLabel("Mes votes"))
      components = [row_1]
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CREATION DE L'EMBED & ENVOIS DU MESSAGE
    int.reply({
      embeds: [makeEmbed(0, 12)],
      components: components
    })
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // FONCTION DE CREATION DE LA BARRE DE VISUALISATION DES VOTES
    function makeBar(x, size) {
      var bar = "";
      for (var i = 0; i < size; i++) {
        if (x - i > 0) {
          bar += "🟩";
        } else {
          bar += "⬛";
        }
      }
      return bar;
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // FONCTION DE LA CREATION DE L'EMBED
    function makeEmbed(total) {
      const poll_embed = functions.createEmbed()
        .setTitle(int.options.get("question").value)
        .setAuthor(int.user.username, int.user.avatarURL())
        .setImage()
      for (var i = 0; i < choices.length; i++) {
        poll_embed.addField(choices[i].value, poll_emojis[i] + "\xa0\xa0" + makeBar((choices[i].votes.length / total * 12), 12));
      }
      return poll_embed;
    }
    // ----------------------------------------------------------------------------------


    // ----------------------------------------------------------------------------------
    // SI INTERACTION
    Akume.on('interaction', interaction => {
      if (interaction.componentType !== "BUTTON") return;

      let verify = false;
      for (var i = 0; i < choices.length; i++) {
        if (choices[i].button_id == interaction.customID) {
          verify = true;
        }
      }
      if (!verify && interaction.customID != view_id) return;

      if (interaction.customID == view_id) {
        let user_votes = choices.filter(choice => choice.votes.includes(interaction.user.id)).map(choice => choice.value);
        if (user_votes.length > 0) {
          interaction.reply({
            content: "Vous avez voté pour\n<:test_emoji_1:860263483194081311> " + user_votes.join("\n<:test_emoji_1:860263483194081311> "),
            ephemeral: true
          })
        } else {
          interaction.reply({
            content: "Vous n'avez pas encore voté 😕 ",
            ephemeral: true
          })
        }
        return;
      }

      for (var i = 0; i < choices.length; i++) {
        if (choices[i].button_id == interaction.customID) {
          if (choices[i].votes.includes(interaction.user.id)) {
            choices[i].votes = choices[i].votes.filter(function(value) {
              return value != interaction.user.id;
            })
          } else {
            if (int.options.get("type-de-sondage") && int.options.get("type-de-sondage").value == "unique") {
              for (var j = 0; j < choices.length; j++) {
                choices[j].votes = choices[j].votes.filter(function(value) {
                  return value != interaction.user.id;
                })
              }
            }
            choices[i].votes.push(interaction.user.id);
          }
          let total = 0;
          for (var k = 0; k < choices.length; k++) {
            choices[k].votes = Array.from(new Set(choices[k].votes));
            total = total + choices[k].votes.length;
          }
          interaction.message.edit({
            embeds: [makeEmbed(total)]
          }).then(function() {
            interaction.deferUpdate();
          })
        }
      }

    })
    // ----------------------------------------------------------------------------------

  },
};
