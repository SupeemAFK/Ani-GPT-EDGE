import { translate } from '@vitalets/google-translate-api';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    if (body?.text) {
        const { text } = await translate(body?.text, { to: 'en' });
        return text
    }
  
    throw createError({
      statusCode: 400,
      statusMessage: 'Input must be provided',
    })
})
  