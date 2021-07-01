const Discord = require('discord.js');

module.exports = {


  readPermissions: function(permissions) {
    let perm = [];
    permissions.forEach((permission, i) => {
      switch (permission) {
        case "MANAGE_CHANNELS":
          perm.push({
            category: "Permissions générales de serveur",
            name: "Gérer les salons",
            description: "Permet aux membres de créer, modifier ou supprimer des salons"
          });
          break;
        case "MANAGE_GUILD":
          perm.push({
            category: "Permissions générales de serveur",
            name: "Gérer le serveur",
            description: "Permet aux membres de changer le nom du serveur, sa région et d'y ajouter des bots"
          });
          break;
        case "VIEW_AUDIT_LOG":
          perm.push({
            category: "Permissions générales de serveur",
            name: "Voir les logs du serveur",
            description: "Permet aux membres de voir un récapitulatif des personnes ayant effectué des changements sur ce serveur."
          });
          break;
        case "VIEW_CHANNEL":
          perm.push({
            category: "Permissions générales de serveur",
            name: "Voir les salons",
            description: "Permet aux membres de voir les salons par défaut (à l'exception des salons privés)"
          });
          break;
        case "MANAGE_ROLES":
          perm.push({
            category: "Permissions générales de serveur",
            name: "Gérer les rôles",
            description: "Permet aux membres de créer de nouveaux rôles et de modifier ou de supprimer les rôles inférieurs à leur rôle le plus élevé. Permet également aux membres de changer les permissions des salons individuels auxquels ils ont accès"
          });
          break;
        case "MANAGE_WEBHOOKS":
          perm.push({
            category: "Permissions générales de serveur",
            name: "Gérer les webhooks",
            description: "Permet aux membres de créer, modifier ou supprimer des webhooks, grâce auxquels ils peuvent poster des messages venant d'autres applications ou sites sur ce serveur"
          });
          break;
        case "MANAGE_EMOJIS":
          perm.push({
            category: "Permissions générales de serveur",
            name: "Gérer les émojis",
            description: "Permet aux membres d'ajouter ou de supprimer des émojis personnalisés sur ce serveur"
          });
          break;
        case "USE_APPLICATION_COMMANDS":
          perm.push({
            category: "Permissions générales de serveur",
            name: "Utiliser les commandes slash",
            description: "Permet aux membres d'utiliser les commandes slash dans les salons textuels"
          });
          break;
        case "CREATE_INSTANT_INVITE":
          perm.push({
            category: "Permissions des membres",
            name: "Créer une invitation",
            description: "Permet aux membres d'inviter de nouvelles personnes sur ce serveur"
          })
          break;
        case "KICK_MEMBERS":
          perm.push({
            category: "Permissions des membres",
            name: "Expulser des membres",
            description: "Permet aux membres d'inviter de nouvelles personnes sur ce serveur"
          })
          break;
        case "BAN_MEMBERS":
          perm.push({
            category: "Permissions des membres",
            name: "Bannir des membres",
            description: "Permet aux membres de bannir définitivement les autres membres de ce serveur"
          });
          break;
        case "CHANGE_NICKNAME":
          perm.push({
            category: "Permissions des membres",
            name: "Changer le pseudo",
            description: "Permet aux membres de changer leur propre pseudo en un nom personnalisé utilisé uniquement sur ce serveur"
          });
          break;
        case "MANAGE_NICKNAMES":
          perm.push({
            category: "Permissions des membres",
            name: "Gérer les pseudos",
            description: "Permet aux membres de changer le pseudo des autres membres"
          });
          break;
        case "ADD_REACTIONS":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Ajouter des réactions",
            description: "Permet aux membres d'ajouter de nouvelles réactions émojis à un message. Si cette permission est désactivée, les membres peuvent toujours réagir en utilisant les réactions existantes"
          });
          break;
        case "SEND_MESSAGES":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Envoyer des messages",
            description: "Permet aux membres d'envoyer des messages dans les salons textuels"
          });
          break;
        case "SEND_TTS_MESSAGES":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Envoyer des messages de synthèse vocale",
            description: "Permet aux membres d'envoyer des messages de synthèse vocale en commençant leur message par /tts. Ces messages peuvent être entendus par toutes les personnes pour qui le salon est en avant-plan"
          });
          break;
        case "MANAGE_MESSAGES":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Gérer les messages",
            description: "Permet aux membres de supprimer les messages des autres membres ou d'épingler n'importe quel message."
          });
          break;
        case "EMBED_LINKS":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Intégrer des liens",
            description: "Autorise les liens partagés par les membres à afficher du contenu intégré dans les salons textuels"
          });
          break;
        case "ATTACH_FILES":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Joindre des fichiers",
            description: "Permet aux membres d'envoyer des fichiers ou médias dans les salons textuels"
          });
          break;
        case "READ_MESSAGE_HISTORY":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Voir les anciens messages",
            description: "Permet aux membres de lire les messages précédemment envoyés dans les salons. Si cette permission est désactivée, les membres ne verront que les messages envoyés alors qu'ils étaient en ligne et que le salon était en avant-plan"
          });
          break;
        case "MENTION_EVERYONE":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Mentionner @everyone, @here et tous les rôles",
            description: "Permet aux membres d'utiliser @everyone (tout le monde sur le serveur) ou @here (seuls les membres en ligne sur ce salon). Ils peuvent aussi utiliser @mention pour tous les rôles, même si leur permission « Autoriser tout le monde à mentionner ce rôle » est désactivée"
          });
          break;
        case "USE_EXTERNAL_EMOJIS":
          perm.push({
            category: "Permissions de salon textuel",
            name: "Utiliser des émojis externes",
            description: "Permet aux membres d'utiliser des émojis d'autres serveurs, à condition d'être membre Discord Nitro"
          });
          break;
        case "PRIORITY_SPEAKER":
          perm.push({
            category: "Permissions de salon vocal",
            name: "Voix prioritaire",
            description: "Permet aux membres d'être entendus plus facilement dans les salons vocaux. Lorsque ce mode est activé, le volume des autres utilisateurs n'ayant pas cette permission sera automatiquement baissé. La voix prioritaire est activée en utilisant le raccourci Appuyer-pour-parler (Prioritaire)"
          });
          break;
        case "STREAM":
          perm.push({
            category: "Permissions de salon vocal",
            name: "Vidéo",
            description: "Permet aux membres de partager leur vidéo, d'utiliser le partage d'écran, ou de streamer un jeu sur ce serveur"
          });
          break;
        case "CONNECT":
          perm.push({
            category: "Permissions de salon vocal",
            name: "Se connecter",
            description: "Permet aux membres de rejoindre les salons vocaux et d'entendre les autres"
          });
          break;
        case "SPEAK":
          perm.push({
            category: "Permissions de salon vocal",
            name: "Parler",
            description: "Permet aux membres de parler dans les salons vocaux. Si cette permission est désactivée, les membres sont muets par défaut à moins qu'un membre disposant de la permission « Couper le micro de membres » ne leur rende la voix"
          });
          break;
        case "MUTE_MEMBERS":
          perm.push({
            category: "Permissions de salon vocal",
            name: "Mettre en sourdine des membres",
            description: "Permet aux membres de mettre en sourdine les autres membres dans les salons vocaux, ce qui les empêchera de parler et d'entendre les autres"
          });
          break;
        case "DEAFEN_MEMBERS":
          perm.push({
            category: "Permissions de salon vocal",
            name: "Couper le micro de membres",
            description: "Permet aux membres de réduire les autres membres au silence pour tout le monde dans les salons vocaux"
          });
          break;
        case "MOVE_MEMBERS":
          perm.push({
            category: "Permissions de salon vocal",
            name: "Déplacer des membres",
            description: "Permet aux membres de déplacer les autres membres entre les salons vocaux auxquels le membre avec cette permission a accès"
          });
          break;
        case "USE_VAD":
          perm.push({
            category: "Permissions de salon vocal",
            name: "Utiliser la Détection de la voix",
            description: "Permet aux membres de discuter dans les salons vocaux simplement en parlant. Si cette permission est désactivée, les membres doivent utiliser Appuyer-pour-parler. Utile pour contrôler les bruits de fond ou les membres trop bruyants"
          });
          break;
        case "VIEW_GUILD_INSIGHTS":
          perm.push({
            category: "",
            name: "VIEW_GUILD_INSIGHTS",
            description: ""
          });
          break;
        case "REQUEST_TO_SPEAK":
          perm.push({
            category: "",
            name: "REQUEST_TO_SPEAK",
            description: ""
          });
          break;
        case "MANAGE_THREADS":
          perm.push({
            category: "",
            name: "MANAGE_THREADS",
            description: ""
          });
          break;
        case "USE_PUBLIC_THREADS":
          perm.push({
            category: "",
            name: "USE_PUBLIC_THREADS",
            description: ""
          });
          break;
        case "USE_PRIVATE_THREADS":
          perm.push({
            category: "",
            name: "USE_PRIVATE_THREADS",
            description: ""
          });
          break;
        case "ADMINISTRATOR":
          perm.push({
            category: "Permissions avancées",
            name: "Administrateur",
            description: "Les membres ayant cette permission auront toutes les permissions"
          });
          break;
      }
    });
    return perm;
  },



  readStatus: function(status) {
    if (!status) return "〰";
    switch (status.type) {
      case "PLAYING":
        return "Joue à " + status.name;
        break;
      case "STREAMING":
        return "Steam " + status.name;
        break;
      case "LISTENING":
        return "Écoute " + status.details + " de " + status.state + " 🎵";
        break;
      case "WATCHING":
        return "Regarde " + status.name;
        break;
      case "CUSTOM":
        if (status.emoji) {
          if (status.state) {
            return status.emoji.name + " " + status.state;
          } else {
            return status.emoji.name;
          }
        } else {
          return status.state;
        }
        break;
      case "COMPETING":
        return "Compétition"
        break;
    }
  },


  createEmbed: function(buttons) {
    var embed = new Discord.MessageEmbed()
      .setImage("https://media.discordapp.net/attachments/750711837355671612/860149710534606888/void.png")
    // .setColor("#2f3136")
    return embed;
  },

  enableAllButtons: function(buttons) { // FONCTION D'ACTIVATION DE TOUT LES BOUTONS
    buttons.forEach((button, i) => { // POUR CHAQUES BOUTONS
      button.setDisabled(false); // ACTIVATION
    });
  },


  readDate: function(x) {
    var new_time = [];
    var text_time = [];
    var date = new Date();
    new_time = [
      date.getUTCFullYear() - x.getUTCFullYear(),
      date.getUTCMonth() - x.getUTCMonth(),
      date.getUTCDate() - x.getUTCDate(),
      date.getHours() - x.getHours(),
      date.getMinutes() - x.getMinutes(),
      date.getSeconds() - x.getSeconds()
    ]
    new_time[5] = new_time[5] + 2;
    if (new_time[5] < 0) {
      new_time[5] = new_time[5] + 60;
      new_time[4] = new_time[4] - 1;
    }
    if (new_time[4] < 0) {
      new_time[4] = new_time[4] + 60;
      new_time[3] = new_time[3] - 1;
    }
    if (new_time[3] < 0) {
      new_time[3] = new_time[3] + 23;
      new_time[2] = new_time[2] - 1;
    }
    if (new_time[2] < 0) {
      new_time[2] = new_time[2] + 30;
      new_time[1] = new_time[1] - 1;
    }
    if (new_time[1] < 0) {
      new_time[1] = new_time[1] + 12;
      new_time[0] = new_time[0] - 1;
    }
    if (new_time[5] == 0) {
      new_time[5] = "";
    } else if (new_time[5] == 1) {
      new_time[5] = "1 seconde";
    } else {
      new_time[5] = new_time[5] + " seconds";
    }
    if (new_time[4] == 0) {
      new_time[4] = "";
    } else if (new_time[4] == 1) {
      new_time[4] = "1 minute";
    } else {
      new_time[4] = new_time[4] + " minutes";
    }
    if (new_time[3] == 0) {
      new_time[3] = "";
    } else if (new_time[3] == 1) {
      new_time[3] = "1 heure";
    } else {
      new_time[3] = new_time[3] + " heures";
    }
    if (new_time[2] == 0) {
      new_time[2] = "";
    } else if (new_time[2] == 1) {
      new_time[2] = "1 jour";
    } else {
      new_time[2] = new_time[2] + " jours";
    }
    if (new_time[1] == 0) {
      new_time[1] = "";
    } else {
      new_time[1] = new_time[1] + " mois";
    }
    if (new_time[0] == 0) {
      new_time[0] = "";
    } else if (new_time[0] == 1) {
      new_time[0] = "1 an";
    } else {
      new_time[0] = new_time[0] + " ans";
    }
    new_time = new_time.filter(item => item !== "");
    if (new_time.length < 2) {
      new_time = new_time[0];
    } else {
      new_time = new_time[0] + " et " + new_time[1];
    }
    return new_time;
  },



}
