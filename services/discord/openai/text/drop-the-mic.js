const main =require('../../zmain.js');
const chatgpt = require('../chatgpt.js');

async function timeout(message,content){
    let text = await chatgpt({
      prompt: `GPT is playing a rap battle against *${message.author.username}*. Response must be 2 rhyming sentences along the rhyme of the *${message.author.username}*. Each repsonse must be new and creative.
      \n${content}\nGPT:`,
      stop:[`${message.author.username}:`]
    });
    text = text.replaceAll('/','\n')
    await message.reply(text);
}
module.exports.run = async ()=>{
  main.ai.on('messageCreate',async  (message) => {
    if(!message.guild)
      return;
    if(!message.author.bot){
      if(message.channel.id == process.env.DROP_THE_MIC_CHANNEL_ID && !message.content.startsWith('!')){
        if(message.mentions.users.size ==0 || message.mentions.users.has(main.ai.user.id)){
          let content = `${message.author.username}:${message.content}` 
          // Start typing in the channel where the message was received
          message.channel.sendTyping();
          const boundFunction = timeout.bind(null,message,content);
          setTimeout(boundFunction,5000);
    
        }
      }
    }
});

}
