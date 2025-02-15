import { Message } from "discord.js";

module.exports = {
  description: "Help commands",
  run: async (message: Message) => {
    message.reply(
      `Este es el centro de ayuda del bot. Se expandira poco a poco mientras mas funcionalidades se agreguen.`
    );
  },
};
