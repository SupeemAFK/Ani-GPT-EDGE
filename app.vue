<script setup lang="ts">
  useHead({
    title: 'Ani-GPT',
    meta: [
      { name: 'description', content: 'Ani-GPT amazing waifu AI assistant' }
    ],
    bodyAttrs: {
      class: 'test'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
    ]
  })
  interface IMessage {
    role: string
    content: string
    name: string
  }

  import axios from "axios"

  const inputText = ref("");
  const voiceData = ref("");
  const talking = ref(false);
  const messages = ref<IMessage[]>([]);
  const conversations = ref<IMessage[]>([]);
  const loading = ref(false);

  function setTalking(newState: boolean) {
    talking.value = newState
  }

  async function generateChat() {
    if (inputText.value != "") {
      loading.value = true;
      voiceData.value = ""
      messages.value.push({ role: "user", content: inputText.value, name: "You" })
      messages.value.push({ role: "loading", content: "", name: "Akiko" })
      conversations.value.push({ role: "user", content: inputText.value, name: "You" })
      
      const { data: chatData } = await axios.post('/api/generate-chat', { messages: conversations.value })
      const { data: jpTranslation } = await axios.post('/api/translate-jp', { text: chatData?.choices[0].message?.content }) //get jp translation
      const { data: voiceBase64Data } = await axios.post('/api/generate-voice', { text: jpTranslation?.translated_text }) //get voice
      
      voiceData.value = voiceBase64Data?.jp_voice;
      inputText.value = ""
      messages.value.splice(messages.value.length - 1, 1, { role: "assistant", content: jpTranslation?.translated_text + " Translation: " + chatData?.choices[0].message?.content, name: "Akiko" })
      conversations.value.push({ role: "assistant", content: chatData?.choices[0].message?.content, name: "Akiko" })
      loading.value = false
    }
  }
</script>

<template>
  <Navbar />

  <div>
    <form @submit="e => {
      e.preventDefault()
      generateChat()
    }">
      <div class="absolute top-0 left-0 w-full h-60 md:h-96 lg:w-4/5 lg:h-[calc(100vh-3rem)] mt-12">
        <video v-if="talking" autoplay loop muted class="w-full h-full">
          <source src="/videos/Talking.mp4" type="video/mp4">
        </video>
        <video v-if="!talking" autoplay loop muted class="w-full h-full">
          <source src="/videos/Idle.mp4" type="video/mp4">
        </video>
        <audio autoplay v-if=" voiceData != '' " @play="e => setTalking(true)" @ended="e => setTalking(false)">
          <source :src="voiceData" type="audio/ogg">
        </audio>
      </div>

      <div class="absolute bottom-0 lg:top-0 right-0 w-full h-[calc(100vh-18rem)] mt-72 md:h-[calc(100vh-27rem)] md:mt-[27rem] lg:w-1/5 lg:h-[calc(100vh-3rem)] lg:mt-12">
        <div class="lg:border-l-[0.01rem] border-slate-500 h-[calc(100%-6rem)] flex flex-col overflow-y-auto">
          <div v-for="msg in messages" class="flex text-sm py-1 px-3">
            <p class="mr-2 font-medium">{{ msg.name }}:</p>
            <p v-if="msg.role != 'loading'" class="font-light break-words">{{ msg.content }}</p>
            <ProgressDots v-if="msg.role == 'loading'" />
          </div>
        </div>
        <div class="lg:border-l-[0.01rem] border-slate-500 flex flex-col items-center justify-end h-24 px-5 py-2">
          <input v-model="inputText" placeholder="How are you?" class="border-slate-500 border-2 w-full text-sm outline-none hover:border-slate-700 rounded-md py-1 focus:py-3 px-2 transition-all" />
          <div class="w-full flex justify-end mt-1">
            <button 
              class="border-slate-500 border-2 rounded-md py-1 px-2 text-sm text-black hover:bg-slate-500 hover:text-white transition-all" 
              type="submit"
              v-if="!loading && !talking"
            >
              Send
            </button>
            <p class="border-slate-500 border-2 p-1 rounded w-full text-center text-sm" v-if="talking">Akiko is talking...</p>
            <div v-if="loading && !talking"  role="status" class="flex justify-center mt-2">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
