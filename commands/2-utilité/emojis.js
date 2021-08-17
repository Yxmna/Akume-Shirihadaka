module.exports = {
  name: "emojis",
  description: "Affiche les emojis du serveur",
  category: "utilité",
  sample: "/emojis",
  accessableby: "all",
  status: 1,
  execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const int = props.interaction;
    const functions = props.functions;
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CRÉATION DE L'EMBED
    const emojis_embed = functions.createEmbed()
      .setAuthor(int.guild.name, int.guild.iconURL())
      .setTitle("Listes des emojis")
    let emojis = int.guild.emojis.cache.map(emoji => "<:" +  emoji.name + ":" + emoji.id + ">");
    emojis = emojis.map(emoji => emoji + "  `" + emoji + "`")
    emojis_embed.setDescription(emojis.join("\n"))
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // ENVOIS DE L'EMBED
    int.reply({
      embeds: [emojis_embed]
    })
    // ----------------------------------------------------------------------------------

  }
};
