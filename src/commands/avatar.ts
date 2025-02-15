import { Embed, EmbedBuilder, Message } from "discord.js";

module.exports = {
  description: "Get avatar",
  run: async (message: Message) => {
    const user = message.mentions.users.first() || message.author;
    const member = await message.guild?.members.fetch(user.id);

    if (!member) return message.reply("Introduce un usuario valido");

    const avatar = member.user.displayAvatarURL({ size: 512 });

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(`Avatar de @${member.user.displayName}`)
      .setImage(avatar);

    message.reply({ embeds: [embed] });
  },
};
