import translator from 'bing-translate-api'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body?.text) {
        const res = await translator.translate(body?.text, 'ja', 'en')
        return res
    }
  
    throw createError({
      statusCode: 400,
      statusMessage: 'Input must be provided',
    })
})
  