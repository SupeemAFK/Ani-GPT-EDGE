export default defineEventHandler(event => {
  async function run() {
    const body = await readBody(event)

    if (body?.text) {
      const base64Wav = await getBase64Audio(`https://api.su-shiki.com/v2/voicevox/audio/?key=${process.env.VOICEVOX_API_KEY}&speaker=0&pitch=0&intonationScale=1&speed=1&text=${body?.text}`)
      return { 
        jp_voice: base64Wav, 
      }
    }

    throw createError({
      statusCode: 400,
      statusMessage: 'Input must be provided',
    })
  }
  run()
})

const getBase64Audio = async (url: any) => {
  const response = await fetch(url)
  const arraybuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arraybuffer);
  const base64 = buffer.toString('base64');
  return "data:audio/wav;base64," + base64
}