module.exports = {
  name: "guild",
  description: "Afficher le profile de la guilde",
  category: "utilité",
  sample: "/guild",
  accessableby: "all",
  status: 1,
  async execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const Akume = props.akume;
    const int = props.interaction;
    const functions = props.functions;
    const embed_color = await functions.getConfigFor(int.guild, "guild", "embed-color");
    var embed_image = await functions.getConfigFor(int.guild, "guild", "embed-image");
    var guild = int.guild;
    var owner = await guild.fetchOwner();
    var color_emojis = await functions.getConfigFor(int.guild, "guild", "random");
    var color = await functions.getConfigFor(int.guild, "guild", "color");
    if (color == "random") color = color_emojis[Math.floor(Math.random() * color_emojis.length)];
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // CRÉATION DE L'EMBED
    let description = "Aucune description"
    if (guild.description) description = guild.description;
    let emojis = [];
    let mod;
    let filter;
    let afk_channel = "Aucun";
    let afk_time = "";
    let mfa_level = "";
    let vanityURL;
    if (guild.vanityURLCode) {
      vanityURL = guild.vanityURLCode + " (" + guild.vanityURLUses + ")"
    }
    if (guild.afkChannel) {
      afk_time = "(" + (guild.afkTimeout / 60) + "min)";
      afk_channel = guild.afkChannel.name;
    }
    switch (guild.mfaLevel) {
      case "NONE":
        mfa_level = "`🟢` MFA désactivé";
        break;
      case "ELEVATED":
        mfa_level = "`🔴` MFA activé";
        break;
    }
    switch (guild.explicitContentFilter) {
      case "DISABLED":
        filter = "`🟢` Analyse désactivé";
        break;
      case "MEMBERS_WITHOUT_ROLES":
        filter = "`🟠` Analyse des messages sans rôles";
        break;
      case "ALL_MEMBERS":
        filter = "`🔴` Analyse de tous les messages";
        break;
    }
    switch (guild.verificationLevel) {
      case "NONE":
        mod = "`🟢` Niveau de vérification: Aucun";
        break;
      case "LOW":
        mod = "`🟠` Niveau de vérification: Email vérifié";
        break;
      case "MEDIUM":
        mod = "`🟠` Niveau de vérification: Inscrit de plus de 5min";
        break;
      case "HIGH":
        mod = "`🟠` Niveau de vérification: Membre de plus de 10min";
        break;
      case "VERY_HIGH":
        mod = "`🔴` Niveau de vérification: Téléphone vérifié";
        break;
    }
    if (guild.partnered) emojis.push("<:PARTNERED_SERVER:909122161229324359>");
    if (guild.verified) emojis[emojis.length - 1] = "<:CERTIFIED:909122193907154994>";
    switch (guild.premiumTier) {
      case "NONE":
        if (guild.premiumSubscriptionCount > 0) emojis.push("<:SERVER_LEVEL0:909118804854976532>");
        break;
      case "TIER_1":
        emojis.push("<:SERVER_LEVEL1:909118845594267708>");
        break;
      case "TIER_2":
        emojis.push("<:SERVER_LEVEL2:909118999567147118>");
        break;
      case "TIER_3":
        emojis.push("<:SERVER_LEVEL3:909119035780784199>");
        break;
    }
    const guild_embed = functions.createEmbed(embed_color, embed_image)
      .setDescription(emojis.join(" ") + " **" + guild.memberCount + " Membres**```" + description + "```")
      .addField("Sécurité", mod + "\n" + mfa_level + "\n" + filter)
    if (vanityURL) guild_embed.addField("Liens personnalisé", vanityURL);
    guild_embed.addField("Salons (" + guild.channels.cache.size + ")", "<:CATEGORY_CHANNEL:909132097778757642> " + guild.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size + " Catégories\n<:TEXT_CHANNEL:909131283412697108> " + guild.channels.cache.filter(c => c.type == "GUILD_TEXT").size + " Textuels\n<:VOCAL_CHANNEL:909131293114105886> " + guild.channels.cache.filter(c => c.type == "GUILD_VOICE").size + " Vocaux\n<:NEWS:909168319570001960> " + guild.channels.cache.filter(c => c.type == "GUILD_NEWS").size + " Actualités\n<:STAGE_CHANNEL:909170177835434064> " + guild.channels.cache.filter(c => c.type == "GUILD_STAGE_VOICE ").size + " Scènes\n<:STORE_CHANNEL:909179315915218955> " + guild.channels.cache.filter(c => c.type == "GUILD_STORE").size + " Boutiques\n<:EVENT_CHANNEL:909218663406641252> " + guild.channels.cache.filter(c => c.type == "GUILD_EVENT").size + " Événements", true)
      .addField("Emojis (" + guild.emojis.cache.size + ")", "<:SMILEY:909127391362834452> " + guild.emojis.cache.filter(c => !c.animated).size + " Normaux\n<:GIF:909204696386904204> " + guild.emojis.cache.filter(c => c.animated).size + " GIFs\n\n**Autres**\n<:ROLE:909215158537166848> " + guild.roles.cache.size + " Rôles\n<:BOT:909215090119692329> " + guild.members.cache.filter(m => m.user.bot).size + " Bots\n<:BOOST:909221530276352030> " + guild.premiumSubscriptionCount + " Boosts", true)
      .addField("Salon AFK " + afk_time + "", "<:VOCAL_CHANNEL:909131293114105886> " + afk_channel + "\n\n**Acronyme**\n<:TEXT_CHANNEL:909131283412697108> " + guild.nameAcronym + "\n\n**Créé <t:" + Math.floor(guild.createdTimestamp / 1000) + ":R>**\n Le <t:" + Math.floor(guild.createdTimestamp / 1000) + ":D>", true)
      .setFooter(owner.user.username + "#" + owner.user.discriminator + " | Fondateur", owner.displayAvatarURL())
      .setAuthor(guild.name, guild.iconURL({
        dynamic: true,
        size: 32
      }))
    if (guild.banner) {
      guild_embed.setImage(guild.bannerURL({
        dynamic: true,
        size: 2048
      }))
    }
    let all_features = functions.readFeatures([
      'ANIMATED_ICON',
      'BANNER',
      'COMMERCE',
      'COMMUNITY',
      'DISCOVERABLE',
      'FEATURABLE',
      'INVITE_SPLASH',
      'MEMBER_VERIFICATION_GATE_ENABLED',
      'NEWS',
      'PARTNERED',
      'PREVIEW_ENABLED',
      'VANITY_URL',
      'VERIFIED',
      'VIP_REGIONS',
      'WELCOME_SCREEN_ENABLED',
      'TICKETED_EVENTS_ENABLED',
      'MONETIZATION_ENABLED',
      'MORE_STICKERS',
      'THREE_DAY_THREAD_ARCHIVE',
      'SEVEN_DAY_THREAD_ARCHIVE',
      'PRIVATE_THREADS',
      'ROLE_ICONS'
    ]).sort();

    let guild_features = all_features.map(feature => {
      if (functions.readFeatures(guild.features).includes(feature)) {
        return "<:CHECK:904511902078619698> " + feature;
      } else {
        return "<:CROSS:904511913491324939> " + feature;
      }
    })
    let temp_features = [];
    for (var i = 0; i < guild_features.length; i++) {
      temp_features.push(guild_features[i]);
      if (i == 10) {
        guild_embed.addField("Atouts (" + guild.features.length + ")", "" + temp_features.join("\n ") + "", true);
        temp_features = [];
      } else if (i == 21) {
        guild_embed.addField("_ _", "" + temp_features.join("\n ") + "", true);
        temp_features = [];
      }
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // ENVOIS DE L'EMBED
    int.reply({
      embeds: [guild_embed]
    })
    // ----------------------------------------------------------------------------------

  }
}
