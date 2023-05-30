const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OpenAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports.openai = openai;
module.exports.run = async ()=>{ 
  console.log('RUNNING');
  const marv = require('./text/sarcasm.js')
  const dropTheMic = require('./text/drop-the-mic.js')
  const songWriter = require('./text/song-writer.js')
 
  marv.run();
  songWriter.run();
  dropTheMic.run();
}
