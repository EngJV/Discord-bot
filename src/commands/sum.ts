import { Message } from "discord.js";

module.exports = {
  description: "Sum numbers",
  run: async (message: Message) => {
    const args = message.content.split(" ").slice(1).join(" ");
    console.log(args);
    const numberArray = args.split(" ").map(Number);
    console.log(numberArray);
    let sum = 0;

    for (let i = 0; i < numberArray.length; i++) {
      if (isNaN(numberArray[i])) {
        message.reply("No es un numero");
        return;
      } else sum += numberArray[i];
    }

    message.reply(`La suma de los numeros es ${sum} `);
  },
};
