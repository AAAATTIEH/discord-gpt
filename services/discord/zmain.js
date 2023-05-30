const Discord = require("discord.js");
const ai = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.DirectMessages
  ],
  partials: [Discord.Partials.Message, Discord.Partials.Channel,Discord.Partials.Reaction],
});
ai.login(process.env.DISCORD_TOKEN);

exports.ai = ai;
exports.Discord = Discord;
require('./events');
