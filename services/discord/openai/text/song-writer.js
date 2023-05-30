const main =require('../../zmain.js');
const openai = require('../zmain.js').openai

const chatgpt = require('../chatgpt.js');
async function timeout(message,content){

  let text = await chatgpt({
    prompt: `GPT is a writing a song with the Player. Fill in 1 short creative sentence along the rhyme of the player.
    \n${content}...\nGPT:`,
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

      if(message.channel.id == process.env.SONG_WRITER_CHANNEL_ID && !message.content.startsWith('!')){
        if(message.mentions.users.size ==0 || message.mentions.users.has(main.ai.user.id)){
          const messages = message.channel.messages.cache.filter(m =>
            (m.createdTimestamp > message.createdTimestamp - 90000)
            && (m.author.id == message.author.id
              || (m.author.bot && m.mentions.repliedUser.id=== message.author.id)
            ) && !(m.content.startsWith('!'))
    
    
          );
        let content = '';
          messages.forEach((item, i) => {
            if(item.author.id == message.author.id)
            content+='\n'+item.content;
            else if(item.author.bot){
              content+='\n'+item.content;
            }
          });
    
          // Start typing in the channel where the message was received
          message.channel.sendTyping();
          const boundFunction = timeout.bind(null,message,content);
          setTimeout(boundFunction,5000);
    
        }

    
    
    
      }
    }
    
});

}
