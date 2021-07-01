module.exports = {
  name: "profile",
  description: "Affiche le profile",
  options: [{
    name: "utilisateur",
    type: "USER",
    description: "Choisi une personne avec son ID ou en la mentionnant",
    required: false
  }],
  fullname: "Profile",
  category: "utilité",
  sample: "/profile `utilisateur:@Akume`",
  accessableby: "all",
  status: 1,
  async execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const Akume = props.akume;
    const int = props.interaction;
    const functions = props.functions;
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
    // RÉCUPÉRATION DES BADGES
    let flags_emojis = []
    user.flags.toArray().forEach((flag, i) => {
      switch (flag) {
        case "DISCORD_EMPLOYEE":
          flags_emojis.push("<:DISCORD_EMPLOYEE:859928886648111184>");
          break;
        case "PARTNERED_SERVER_OWNER":
          flags_emojis.push("<:PARTNERED_SERVER_OWNER:859928990474567740>");
          break;
        case "HYPESQUAD_EVENTS":
          flags_emojis.push("<:HYPESQUAD_EVENTS:859928953750028299>");
          break;
        case "BUGHUNTER_LEVEL_1":
          flags_emojis.push("<:BUGHUNTER_LEVEL_1:859928844331647066>");
          break;
        case "HOUSE_BRAVERY":
          flags_emojis.push("<:HOUSE_BRAVERY:859928934452035614>");
          break;
        case "HOUSE_BRILLIANCE":
          flags_emojis.push("<:HOUSE_BRILLIANCE:859928944501063680>");
          break;
        case "HOUSE_BALANCE":
          flags_emojis.push("<:HOUSE_BALANCE:859928922321977375>");
          break;
        case "EARLY_SUPPORTER":
          flags_emojis.push("<:EARLY_SUPPORTER:859928899097198623>");
          break;
        case "BUGHUNTER_LEVEL_2":
          flags_emojis.push("<:BUGHUNTER_LEVEL_2:859928859700625438>");
          break;
        case "EARLY_VERIFIED_BOT_DEVELOPER":
          flags_emojis.push("<:EARLY_VERIFIED_BOT_DEVELOPER:859928911302492210>");
          break;
        case "DISCORD_CERTIFIED_MODERATOR":
          flags_emojis.push("<:DISCORD_CERTIFIED_MODERATOR:859928872745172993>");
          break;
      }
    });
    if (user.bot) flags_emojis.push("<:BOT_1:859936950717513751><:BOT_2:859936960160464937>");
    if (user.id == int.guild.ownerID) flags_emojis.push("<:owner:859910047503745024>");
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CRÉATION DE L'EMBED
    const profile_embed = functions.createEmbed()
      .setAuthor(user.username, user.avatarURL())
      .setImage(user.avatarURL({
        dynamic: true,
        size: 512
      }))
      .setThumbnail(user.avatarURL())
      .setTimestamp(user.createdAt)
      .setFooter("ID: " + user.id)
      .addField("Données public", ">>> Profile: " + "<@" + user.id + ">" + "\nTag: " + user.tag + "\nCrée il y a " + functions.readDate(user.createdAt))
    if (int.guild.members.cache.get(user.id)) {
      let member = int.guild.members.cache.get(user.id);
      profile_embed
        .setDescription("```" + functions.readStatus(member.presence.activities[0]) + "```");
      let surnom = "❌";
      if (member.nickname) surnom = member.nickname;
      let lastMessage = "Pas vu depuis " + functions.readDate(Akume.readyAt);
      if (member.lastMessage) lastMessage = "Vue il y a " + functions.readDate(member.lastMessage.createdAt);
      profile_embed
        .addField("Données serveur", ">>> Surnom: " + surnom + "\nPrésent depuis " + functions.readDate(member.joinedAt) + "\n" + lastMessage)
        .setAuthor(member.displayName, user.avatarURL())
    } else {
      profile_embed.setDescription("");
    }
    if (flags_emojis.join(" ").length > 256) {
      let temp_desc = profile_embed.description;
      profile_embed.setDescription(flags_emojis.join(" ") + temp_desc)
    } else {
      profile_embed.setTitle(flags_emojis.join(" "))
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // ENVOIS DE L'EMBED
    int.reply({
      embeds: [profile_embed]
    })
    // ----------------------------------------------------------------------------------

  },
};
