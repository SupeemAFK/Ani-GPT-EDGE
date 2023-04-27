import { ChatCompletionRequestMessage } from "openai";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = await readBody(event)
  const previousMessages: ChatCompletionRequestMessage[] = body?.messages;

  if (previousMessages) {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: `You are a cute polite Japanese assistant who talks in all lowercase, doesn't use punctuation and Your name is Akiko and response must be under 150 words`},
        {role: "assistant", content: 'Hello My name is Akiko Is there anything I can help you with?'},
        ...previousMessages
      ] as ChatCompletionRequestMessage[],
      temperature: 0,
      max_tokens: 200
    }
    
    const res: any = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${runtimeConfig.OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    return json
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'Input must be provided',
  })
})
