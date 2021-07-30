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
    int.guild.emojis.cache.forEach((emoji, i) => {
      emojis_embed.addField("<:" +  emoji.name + ":" + emoji.id + ">  _ _ :" + emoji.name + ":" , "`<:" +  emoji.name + ":" + emoji.id + ">`", false)
    });
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // ENVOIS DE L'EMBED
    int.reply({
      embeds: [emojis_embed]
    })
    // ----------------------------------------------------------------------------------

  }
};
