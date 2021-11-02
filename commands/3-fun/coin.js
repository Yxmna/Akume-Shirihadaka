module.exports = {
  name: "coin",
  description: "Jouer à pile ou face",
  category: "fun",
  sample: "/coin",
  accessableby: "all",
  status: 1,
  async execute(props) {
    // ----------------------------------------------------------------------------------
    // VARIABLES
    const int = props.interaction;
    var r = Math.random() * 2;
    var coin_result = "";
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // LANCEMENT DE LA PIÈCE
    if (r > 1) {
      coin_result = "PILE";
    } else {
      coin_result = "FACE";
    }
    // ----------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    //ENVOIS DU MESSAGE
    int.reply("_ _ _ _ _ _\n_ _ _ _ _ _\n_ _ _ _ _ _\n :right_facing_fist:")
      .then(function() {
        int.editReply("_ _ _ _ _ _\n_ _ _ _ _ _\n_ _ _ _ _ _\n :right_facing_fist:");
        int.editReply("_ _ _ _ _ _\\\n_ _ _ _ _ _\n_ _ _ _ _ _\n :thumbsup:");
        int.editReply("_ _ _ _ _ _/\n_ _ _ _ _ _\n_ _ _ _ _ _\n :thumbsup:");
        int.editReply("_ _ _ _ _ _\n_ _ _ _ _ _\\\n_ _ _ _ _ _\n :thumbsup:");
        int.editReply("_ _ _ _ _ _\n_ _ _ _ _ _\n_ _ _ _ _ _\n :right_facing_fist:");
        int.editReply(":grin:   < " + coin_result + " !");
      })
    // ----------------------------------------------------------------------------------

  }
};
