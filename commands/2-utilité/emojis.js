module.exports = {
  name: "emojis",
  description: "Afficher les emojis du serveur",
  options: [{
    name: "type",
    type: 3,
    description: "Choisir le type de liste",
    required: false,
    choices: [{
      name: "liste simple",
      value: "liste"
    }, {
      name: "liste avec ID",
      value: "détaillé"
    }]
  }],
  category: "utilité",
  sample: "/emojis",
  accessableby: "all",
  status: 1,
  async execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const int = props.interaction;
    const functions = props.functions;
    var embed_color = await functions.getConfigFor(int.guild, "emojis", "embed-color");
    var embed_image = await functions.getConfigFor(int.guild, "emojis", "embed-image");
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CRÉATION DE L'EMBED
    let emojis = int.guild.emojis.cache.map(emoji => "<:" + emoji.name + ":" + emoji.id + ">");
    const emojis_embed = functions.createEmbed(embed_color, embed_image)
      .setAuthor(int.guild.name, int.guild.iconURL())
      .setFooter(emojis.length + " émojis")
    if (int.options.get("type") && int.options.get("type").value == "détaillé") {
      emojis = emojis.map(emoji => emoji + "  `" + emoji + "`")
      emojis_embed.setDescription(emojis.join("\n"))
    } else {
      emojis_embed.setDescription(emojis.join("  "))
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // ENVOIS DE L'EMBED
    int.reply({
      embeds: [emojis_embed]
    })
    // ----------------------------------------------------------------------------------

  }
};
