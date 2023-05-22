export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = await readBody(event)

  if (body?.text) {
    const url = `https://translate287.p.rapidapi.com/translate/?dest=ja&text=${body.text}&src=auto`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': runtimeConfig.RAPID_API_KEY,
        'X-RapidAPI-Host': 'translate287.p.rapidapi.com'
      }
    };

    const res = await fetch(url, options)
    const text = await res.text();
    return text;
  }
  
  throw createError({
    statusCode: 400,
    statusMessage: 'Input must be provided',
  })
})
  