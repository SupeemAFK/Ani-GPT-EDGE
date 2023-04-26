import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-XPLjH6Gx2RpnHEf4Ajg7N2Hj",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const previousMessages: ChatCompletionRequestMessage[] = body?.messages;
  
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {role: "system", content: `You are a cute Japanese assistant who talks in all lowercase, doesn't use punctuation and Your name is Akiko and response must be under 150 words and respond in Japanese`},
          {role: "assistant", content: 'こんにちは、どうすればお手伝いできますか'},
          ...previousMessages
        ],
        temperature: 0,
        max_tokens: 200
    });
    if (completion.data.choices[0].message?.content) {
        return completion.data.choices[0].message?.content
    }
    else {
        return { error: "Error kuy" }
    }    
})
