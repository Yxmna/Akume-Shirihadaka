module.exports = {
  name: "avatar",
  description: "Afficher l'avatar",
  options: [{
    name: "utilisateur",
    type: 6,
    description: "Choisir une personne avec son ID ou en la mentionnant",
    required: false
  }],
  category: "utilité",
  sample: "/avatar `utilisateur:@Akume`",
  accessableby: "all",
  status: 1,
  async execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const int = props.interaction;
    const functions = props.functions;
    var embed_color = await functions.getConfigFor(int.guild, "avatar", "embed-color");
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // RÉCUPÉRATION DE L'UTILISATEUR
    let user;
    if (int.options.get("utilisateur")) {
      user = int.options.get("utilisateur").user;
    } else {
      user = int.user;
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CRÉATION DE L'EMBED
    const avatar_embed = functions.createEmbed(embed_color)
      .setThumbnail(user.avatarURL({
        dynamic: true
      }))
      .setDescription("ID: " + user.id)
      .setAuthor("Avatar de " + user.username, user.avatarURL({
        dynamic: true
      }))
      .setImage(user.avatarURL({
        format: "png",
        dynamic: true,
        size: 4096
      }))
      .addField("Format", "[`PNG`](" + user.avatarURL({
        format: "png",
        size: 4096
      }) + ") [`JPG`](" + user.avatarURL({
        format: "jpg",
        size: 4096
      }) + ") [`GIF`](" + user.avatarURL({
        format: "gif",
        size: 4096
      }) + ") [`WEBP`](" + user.avatarURL({
        format: "webp",
        size: 4096
      }) + ")")
      .addField("Taille", "[`MAX`](" + user.avatarURL({
        format: "png",
        dynamic: true,
        size: 4096
      }) + ") [`256`](" + user.avatarURL({
        format: "png",
        dynamic: true,
        size: 256
      }) + ") [`64`](" + user.avatarURL({
        format: "png",
        dynamic: true,
        size: 64
      }) + ") [`32`](" + user.avatarURL({
        format: "png",
        dynamic: true,
        size: 32
      }) + ")")
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // ENVOIS DE L'EMBED
    int.reply({
      embeds: [avatar_embed]
    })
    // ----------------------------------------------------------------------------------

  }
};
