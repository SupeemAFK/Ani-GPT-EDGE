export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = await readBody(event)

  if (body?.text) {
    const encodedParams = new URLSearchParams();
    encodedParams.set('from', 'ja');
    encodedParams.set('to', 'en');
    encodedParams.set('text', body?.text);
    const res = await fetch('https://translo.p.rapidapi.com/api/v3/translate', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': runtimeConfig.RAPID_API_KEY,
        'X-RapidAPI-Host': "translo.p.rapidapi.com"
      },
      body: encodedParams
    })
    const text = await res.text();
    return text;
  }
  
  throw createError({
    statusCode: 400,
    statusMessage: 'Input must be provided',
  })
})
  