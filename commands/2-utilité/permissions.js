module.exports = {
  name: "permissions",
  description: "Afficher les permissions",
  options: [{
    name: "utilisateur",
    type: "USER",
    description: "Choisir une personne avec son ID ou en la mentionnant",
    required: false
  }],
  category: "utilité",
  sample: "/permissions `utilisateur:@Akume`",
  accessableby: "all",
  status: 1,
  async execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const int = props.interaction;
    const functions = props.functions;
    var embed_color = await functions.getConfigFor(int.guild, "permissions", "embed-color");
    var embed_image = await functions.getConfigFor(int.guild, "permissions", "embed-image")
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // RÉCUPÉRATION DU MEMBRE
    let user;
    if (int.options.get("utilisateur")) {
      user = int.options.get("utilisateur").user;
    } else {
      user = int.user;
    }
    let member = int.guild.members.cache.get(user.id);
    if (!member) {
      int.reply({
        content: "`" + user.username + "` (" + user.id + ") n'est pas présent sur le serveur et n'a donc pas de permissions",
        ephemeral: true
      })
      return;
    };
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CRÉATION DE L'EMBED
    const permissions_embed = functions.createEmbed(embed_color, embed_image)
      .setAuthor(member.displayName, member.user.avatarURL())
    let permissions = functions.readPermissions(member.permissions.toArray());
    permissions_embed.setFooter(permissions.length + " permissions")
    let permissions_categories = Array.from(new Set(permissions.map(permission => permission.category)));
    permissions_categories.forEach((category, i) => {
      let category_string = category
      if (!category) category_string = "Inconnue";
      let inline = true;
      if (i % 2 == 0) inline = false;
      permissions_embed.addField(category_string, permissions.filter(perm => perm.category == category).map(perm => perm.name).join("\n"), inline);
    });
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // ENVOIS DE L'EMBED
    int.reply({
      embeds: [permissions_embed]
    })
    // ----------------------------------------------------------------------------------

  },
};
