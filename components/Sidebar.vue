<template>
  <aside class="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
    <div class="w-full p-4 bg-gray-800 flex justify-center gap-4">
      <button 
        @click="changeLanguage('en')"
        class="w-8 h-6 transition-all hover:scale-105"
        :class="{ 'border-2 border-white': currentLanguage === 'en', 'opacity-80': currentLanguage !== 'en' }"
      >
        <img src="assets/img/uk.svg" alt="English" class="w-full h-full object-cover" />
      </button>
      <button 
        @click="changeLanguage('it')"
        class="w-8 h-6 transition-all hover:scale-105"
        :class="{ 'border-2 border-white': currentLanguage === 'it', 'opacity-80': currentLanguage !== 'it' }"
      >
        <img src="assets/img/it.svg" alt="Italian" class="w-full h-full object-cover" />
      </button>
    </div>

    <div class="p-6 flex-1 flex flex-col items-center justify-center">
      <div class="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8">
        <nuxt-img
          src="/profile.jpg"
          alt="Profile"
          class="w-full h-full object-cover"
          :style="{ 'object-position': '50% 25%' }"
        />
      </div>

      <nav class="w-full">
        <ul class="space-y-2">
          <li v-for="link in links" :key="link.id" class="flex justify-center">
            <button 
              @click="handleSectionChange(link.id)"
              class="w-full max-w-xs flex justify-center p-3 rounded-lg transition-colors focus:outline-none hover:bg-gray-700"
              :class="{ 'bg-gray-700': activeSection === link.id }"
            >
              <span>{{ contentStore.content.sidebar[link.id as 'about' | 'experience' | 'education' | 'skills' | 'contacts'] }}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useContentStore } from '~/stores/content'

  defineProps({
    activeSection: String,
    links: {
      type: Array as () => Array<{ id: string; label: string }>,
      default: () => [
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' }
      ]
    }
  })

  const emit = defineEmits(['change-section', 'open-contact'])

  const currentLanguage = ref('en')
  const contentStore = useContentStore()

  onMounted(() => {
    contentStore.loadContent(currentLanguage.value)
  })

  const changeLanguage = (lang: string) => {
    currentLanguage.value = lang
    contentStore.loadContent(lang)
  }

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === 'contacts') {
      emit('open-contact')
    } else {
      emit('change-section', sectionId)
    }
  }
</script>