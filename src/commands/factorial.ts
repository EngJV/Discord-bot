import { Message } from "discord.js";

module.exports = {  
    description: "make factorial of a number",
    run: async (message: Message) => {
        
        const args = Number(message.content.split(' ').slice(1).join(' ')); 
  
        if (isNaN(args)) {
            message.reply("No es un numero");
            return;
        }

        const factorial = (n: number): number => {
            if (n <= 1){
                return 1;
            }
            return n * factorial(n - 1);
        }

        message.reply(`El factorial de ${args} es ${factorial(args)}`);

    }
}