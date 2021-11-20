module.exports = {
  name: "profile",
  description: "Afficher le profile",
  options: [{
    name: "utilisateur",
    type: 6,
    description: "Choisir une personne avec son ID ou en la mentionnant",
    required: false
  }],
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
    const embed_color = await functions.getConfigFor(int.guild, "profile", "embed-color");
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // RÉCUPÉRATION DE L'UTILISATEUR
    let user;
    if (int.options.get("utilisateur")) {
      user = int.options.get("utilisateur").user;
    } else {
      user = int.user;
    }
    user = await user.fetch();
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // RÉCUPÉRATION DES BADGES
    let flags_emojis = []
    user.flags.toArray().forEach((flag, i) => {
      switch (flag) {
        case "DISCORD_EMPLOYEE":
          flags_emojis.push("<:DISCORD_EMPLOYEE:904498044848984084>");
          break;
        case "PARTNERED_SERVER_OWNER":
          flags_emojis.push("<:PARTNERED_SERVER_OWNER:904496697533689856>");
          break;
        case "HYPESQUAD_EVENTS":
          flags_emojis.push("<:HYPESQUAD_EVENTS:904497059279806465>");
          break;
        case "BUGHUNTER_LEVEL_1":
          flags_emojis.push("<:BUGHUNTER_LEVEL_1:904494049975738409>");
          break;
        case "HOUSE_BRAVERY":
          flags_emojis.push("<:HOUSE_BRAVERY:904495910241833071>");
          break;
        case "HOUSE_BRILLIANCE":
          flags_emojis.push("<:HOUSE_BRILLIANCE:904495921574854696>");
          break;
        case "HOUSE_BALANCE":
          flags_emojis.push("<:HOUSE_BALANCE:904494943463170119>");
          break;
        case "EARLY_SUPPORTER":
          flags_emojis.push("<:EARLY_SUPPORTER:904497803705847878>");
          break;
        case "BUGHUNTER_LEVEL_2":
          flags_emojis.push("<:BUGHUNTER_LEVEL_2:904494677519106098>");
          break;
        case "EARLY_VERIFIED_BOT_DEVELOPER":
          flags_emojis.push("<:EARLY_VERIFIED_BOT_DEVELOPER:904497578123604038>");
          break;
        case "DISCORD_CERTIFIED_MODERATOR":
          flags_emojis.push("<:DISCORD_CERTIFIED_MODERATOR:904498239804440616>");
          break;
      }
    });
    if (user.id == Akume.user.id) flags_emojis = ["<:DISCORD_EMPLOYEE:904498044848984084>", "<:PARTNERED_SERVER_OWNER:904496697533689856>", "<:HYPESQUAD_EVENTS:904497059279806465>", "<:BUGHUNTER_LEVEL_1:904494049975738409>", "<:HOUSE_BRAVERY:904495910241833071>", "<:EARLY_SUPPORTER:904497803705847878>", "<:BUGHUNTER_LEVEL_2:904494677519106098>", "<:HOUSE_BRILLIANCE:904495921574854696>", "<:EARLY_VERIFIED_BOT_DEVELOPER:904497578123604038>", "<:GUILD_OWNER:904496544408039454>", "<:DISCORD_CERTIFIED_MODERATOR:904498239804440616>"]
    if (user.bot) flags_emojis.push("<:BOT1:904526926360748063><:BOT2:904526955372753009>");
    if (user.id == int.guild.ownerId) flags_emojis.push("<:GUILD_OWNER:904496544408039454>");
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CRÉATION DE L'EMBED
    const profile_embed = functions.createEmbed(embed_color)
      .setAuthor(user.username, user.displayAvatarURL({
        dynamic: true,
        size: 32
      }))
      .setThumbnail(user.displayAvatarURL({
        dynamic: true,
        size: 128
      }))
      .setImage(user.displayAvatarURL({
        dynamic: true,
        size: 512
      }))
      .setTimestamp(user.createdAt)
      .setFooter("ID: " + user.id)
      .setDescription("")
      .addField("Données public", "<:test_emoji_1:860263483194081311> Profile: " + user.toString() + "\n<:test_emoji_1:860263483194081311> Tag: " + user.tag + "\n<:test_emoji_1:860263483194081311> Créé <t:" + user.createdTimestamp.toString().slice(0, -3) + ":R>")
    if (user.banner) {
      profile_embed.setImage(user.bannerURL({
        dynamic: true,
        size: 512
      }))
    }
    if (user.accentColor) {
      profile_embed.setColor(user.accentColor);
    }
    if (flags_emojis.length > 0 && flags_emojis.length < 5) {
      profile_embed.setDescription("Profil extérieur  | " + flags_emojis.join(" "))
    } else if (flags_emojis.length > 4) {
      profile_embed.setDescription("Profil extérieur\n" + flags_emojis.join(" "))
    } else {
      profile_embed.setDescription("Profil extérieur");
    }
    if (int.guild.members.cache.get(user.id)) {
      let member = int.guild.members.cache.get(user.id);
      let status = "";
      if (member.presence) {
        switch (member.presence.status) {
          case "online":
            status = "<:ONLINE:909161988989542400> En ligne"
            break;
          case "dnd":
            status = "<:DND:904504600097353728> Ne pas déranger"
            break;
          case "idle":
            status = "<:IDLE:904504591591284736> Inactif"
            break;
          case "offline":
            status = "<:OFFLINE:904504581063602196> Déconnecté"
            break;
        }
      } else {
        status = "<:OFFLINE:904504581063602196> Déconnecté"
      }
      profile_embed.setDescription(status);
      if (flags_emojis.length > 0 && flags_emojis.length < 5) {
        let temp_desc = profile_embed.description;
        profile_embed.setDescription(flags_emojis.join(" ") + " " + temp_desc)
      } else if (flags_emojis.length > 4) {
        let temp_desc = profile_embed.description;
        profile_embed.setDescription(flags_emojis.join(" ") + "\n" + temp_desc)
      }
      if (functions.readStatus(member)) {
        let temp_desc = profile_embed.description;
        profile_embed.setDescription(temp_desc + "```" + functions.readStatus(member) + "```");
      }
      let surnom = "❌";
      if (member.nickname) surnom = member.nickname;
      let role = "Aucun rôle"
      if (member.roles && member.roles.color) {
        role = "<@&" + member.roles.color.id + ">";
      }
      profile_embed
        .addField("Données serveur", "<:test_emoji_1:860263483194081311> Surnom: " + surnom + "\n<:test_emoji_1:860263483194081311> Rejoint <t:" + member.joinedTimestamp.toString().slice(0, -3) + ":R>\n<:test_emoji_1:860263483194081311> Rôle: " + role)
        .setAuthor(member.displayName, user.displayAvatarURL({
          dynamic: true,
          size: 32
        }))
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
