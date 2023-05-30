const openai = require('./zmain.js').openai

module.exports = async ({prompt,stop})=>{
    try{
        let response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop:stop,
          });
        let text = response.data.choices[0].text;
        if(!text || text=='')
          return '_ _';
        return text;
    }catch(e){
        let json = e.toJSON();
        switch(json.status){
          case 401:
            return '```diff\n-Invalid API Key\n```';
          case 429: 
            return '```diff\n-Rate limit reached or current quota exceeded\n```';
          case 500:
            return '```diff\n-OpenAI Server Error\n```'
          case 503:
            return '```diff\n-OpenAI servers are experiencing high traffic\n```'
        }
        return 'An Error has Occurred'
    }
}