// index file
import dotenv from "dotenv";
import { Client, Events, TextChannel } from "discord.js";

// load the environment variables
dotenv.config();

const { WELCOME_CHANNEL_ID, API_KEY } = process.env;

if (!WELCOME_CHANNEL_ID || !API_KEY) {
  throw new Error("Missing environment variables");
  process.exit(1);
}

// Create a new discord client
const client = new Client({
  intents: 53608447,
});

// Our first event
// check if the bot is ready
client.on(Events.ClientReady, async () => {
  if (client.user) {
    // check if client user is not null
    console.log(`Connected has ${client.user.username}!`);
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return; // ignore bot messages
  if (!message.content.startsWith("-")) return; // ignore messages that don't start with -

  const args = message.content.slice(1).split(" ")[0]; // remove the -

  try {
    const command = require(`./commands/${args}`);
    command.run(message);
  } catch (error) {
    console.log(
      `Ha ocurrido un error al utilizar -${args}`,
      (error as Error).message
    );
    message.reply(`Comando "-${args}" no encontrado o con error`);
  }
});

client.on(Events.GuildMemberAdd, async (member) => {
  const channel = await client.channels.fetch(WELCOME_CHANNEL_ID);
  const textChannel = channel as TextChannel;
  await textChannel.send(
    `**<@${member.user.username}>** ha entrado al servidor`
  );
});

client.login(API_KEY);
