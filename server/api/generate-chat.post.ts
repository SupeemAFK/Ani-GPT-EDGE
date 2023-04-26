export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const previousMessages: any[] = body?.messages;

  if (previousMessages) {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: `You are a cute Japanese assistant who talks in all lowercase, doesn't use punctuation and Your name is Akiko and response must be under 150 words and respond in Japanese`},
        {role: "assistant", content: 'こんにちは、どうすればお手伝いできますか'},
        ...previousMessages
      ],
      temperature: 0,
      max_tokens: 200
    }
    
    const res: any = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    return {
      content: json?.choices[0].message?.content
    }
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'Input must be provided',
  })
})
