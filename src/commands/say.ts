import { Message } from "discord.js";

module.exports = {
  description: "Repeat what you say",
  run: async (message: Message) => {
    const args = message.content.split(" ").slice(1).join(" ");

    if (args.length < 1) return message.reply("Mensaje muy corto");

    message.reply(args);
  },
};
