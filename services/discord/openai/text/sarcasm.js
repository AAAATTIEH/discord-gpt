const main =require('../../zmain.js');
const chatgpt = require('../chatgpt.js');
async function timeout(message,content){

    let text = await chatgpt({
      prompt: `GPT is a chatbot that reluctantly answers questions with sarcastic responses :\n${content}\nGPT:`,
      stop:[`${message.author.username}:`]
    });
    await message.reply(text);
}

module.exports.run = async ()=>{
  
  main.ai.on('messageCreate',async  (message) => {
  if(!message.guild)
    return;
  if(!message.author.bot){
    if(message.channel.id == process.env.SARCASM_CHANNEL_ID && !message.content.startsWith('!')){
      if(message.mentions.users.size ==0 || message.mentions.users.has(main.ai.user.id)){
        const messages = message.channel.messages.cache.filter(m =>
          (m.createdTimestamp > message.createdTimestamp - 90000)
          && (m.author.id == message.author.id
            || (m.author.bot && m.mentions.repliedUser.id=== message.author.id)&& !(m.content.startsWith('!'))
          )
        );
        let content = '';
        messages.forEach((item) => {
          if(item.author.id == message.author.id)
          content+=`\n${message.author.username}:`+item.content;
          else if(item.author.bot){
            content+='\nGPT:'+item.content;
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
