import translate from 'google-translate-api-x';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    if (body?.text) {
        const res = await translate(body?.text, { from: 'ja', to: 'en' });
        return res
    }
  
    throw createError({
      statusCode: 400,
      statusMessage: 'Input must be provided',
    })
})
  