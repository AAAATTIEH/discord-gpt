
const main = require('./zmain.js')
const openai = require('./openai/zmain')
main.ai.on("ready", async () => {

  console.log('CLIENT IS READY');
  
  //Set the presence of the bot
  main.ai.user.setPresence({
    activities: [{ name: `with AI`, type: main.Discord.ActivityType.Playing }], 
  });
  console.log(`Discord Bot ${main.ai.user.id} is online!`);
  
  await openai.run();

});
