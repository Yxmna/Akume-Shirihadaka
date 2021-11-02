const fs = require("fs");
const Discord = require('discord.js');
module.exports = {
  name: "about",
  description: "Afficher les informations concernant Akume",
  category: "général",
  sample: "/about",
  accessableby: "all",
  status: 1,
  async execute(props, int_button) {
    var version = "BETA 0.1.0";
    const int = props.interaction;
    const functions = props.functions;
    const Akume = props.akume;
    const MessageButton = props.buttons;
    const MessageActionRow = props.actionrow;
    var embed_color = await functions.getConfigFor(int.guild, "help", "embed-color");
    var embed_image = await functions.getConfigFor(int.guild, "help", "embed-image");

    var fileCount = 0;
    var total_size = 0;
    let all_dirs = [];
    props.categorys.forEach((category, i) => {
      all_dirs.push(process.cwd() + "\\commands\\" + (i + 1) + "-" + category);
    });
    all_dirs.push(process.cwd());
    all_dirs.forEach((dir, i) => {
      fileCount = fileCount + fs.readdirSync(dir).length;
      fs.readdirSync(dir).forEach((file, i) => {
        total_size = total_size + (fs.statSync(dir + "\\" + file).size / 1000);
      });
    });
    total_size = Math.floor(total_size * (1000 / 1024) * 10) / 10;
    var user_count = 0;
    Akume.guilds.cache.each((guild, i) => {
      user_count = user_count + guild.memberCount;
    });

    var buttons = new MessageActionRow()
      .addComponents(new MessageButton()
        .setStyle("LINK")
        .setLabel("Rejoindre le serveur")
        .setURL("https://discord.gg/8ZcfCkpuNC"))
      .addComponents(new MessageButton()
        .setStyle("LINK")
        .setLabel("Github")
        .setURL("https://github.com/Yxmna/Akume-Shirihadaka"))
      .addComponents(new MessageButton()
        .setStyle("LINK")
        .setLabel("Wiki")
        .setURL("https://github.com/Yxmna/Akume-Shirihadaka/wiki"))

    let embed = functions.createEmbed(embed_color, embed_image)
      .setAuthor("Akume Shirihadaka", Akume.user.displayAvatarURL())
      .setTitle("Réveillé <t:" + Math.floor((Date.now() - Akume.uptime) / 1000) + ":R>")
      .setDescription("```Version " + version + "```")
      .addField("Informations", ">>> `" + (Math.floor((process.memoryUsage().external / 1000000) * 100) / 100) + "` Mb d'utilisation\n`" + total_size + "` Ko de fichiers\n`" + process.version + "` Node-js\n`" + Discord.version + "` Discord.js", true)
      .addField("Statistiques", ">>> `" + Akume.guilds.cache.size + "` Serveurs\n`" + user_count + "` Utilisateurs\n`" + Akume.commands.size + "` Commandes" + "\n`" + fileCount + "` Fichiers", true)
      .addField("Liens", "[Rejoignez le serveur !](https://discord.gg/8ZcfCkpuNC)")
      .setFooter("")

    if (!int_button) {
      int.reply({
        embeds: [embed],
        components: [buttons]
      })
    } else {
      int.channel.send({
        embeds: [embed],
        components: [buttons]
      })
    }


  }
}
