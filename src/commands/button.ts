import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const usernameButton = new ButtonBuilder()
  .setCustomId("username")
  .setEmoji("👤")
  .setLabel("Mostrar nombre de usuario")
  .setStyle(ButtonStyle.Primary);

const avatarButton = new ButtonBuilder()
  .setCustomId("avatar")
  .setEmoji("👤")
  .setLabel("Mostrar avatar de usuario")
  .setStyle(ButtonStyle.Secondary);

module.exports = {
  description: "Show Buttons",
  run: async (message: any) => {
    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      usernameButton,
      avatarButton
    );

    const reply = await message.reply({ components: [actionRow] });

    // Message Recollector
    const filter = (interaction: any) =>
      interaction.user.id === message.author.id &&
      interaction.message.id === reply.id;
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 60 * 1000,
    });

    // when the collector is active
    collector.on("collect", async (interaction: any) => {
      if (interaction.customId === "username") {
        interaction.update({
          content: `Tu nombre de usuario es: ${interaction.user.username}`,
          components: [],
        });
      } else if (interaction.customId === "avatar") {
        const avatar = interaction.user.displayAvatarURL({ size: 512 });
        interaction.update({
          content: `Tu avatar es:`,
          files: [avatar],
          components: [],
        });
      }

      // when the collector is done
      collector.on("end", async () => {
        reply.edit({ components: [] }).catch(console.error);
      });
    });
  },
};
