<template>
  <section id="about" class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Name -->
      <h1 class="text-4xl font-bold mb-0">
        Nicolò Pietro <span class="text-blue-700">Belcastro</span>
      </h1>
      
      <div class="text-xl font-medium mb-8 text-gray-600">
        {{ contentStore.content.about.title }} · {{ contentStore.content.about.location }}
        <a class="text-blue-600 hover:text-blue-700 cursor-pointer" href="mailto:{{ contentStore.content.about.email }}">
          {{ contentStore.content.about.email }}
        </a>
      </div>
      
      <p class="text-xl font-light mb-8 text-gray-700">
        {{ contentStore.content.about.bio }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          v-for="(language, index) in contentStore.content.about.languages" 
          :key="index" 
          class="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center"
        >
          <h3 class="text-lg font-semibold text-gray-800">{{ language.name }}</h3>
          <p class="text-sm text-gray-600">{{ language.level }}</p>
        </div>
      </div>
      
      <div class="flex gap-4 mt-8">
        <a 
          v-for="icon in socialIcons" 
          :key="icon.name"
          :href="icon.url"
          class="flex items-center justify-center w-12 h-12 bg-gray-700 text-white rounded-full text-xl hover:bg-blue-600 transition-colors duration-200"
          :aria-label="icon.name"
        >
          <Icon :name="icon.icon" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useContentStore } from '~/stores/content'

  const contentStore = useContentStore()

  interface SocialIcon {
    name: string
    icon: string
    url: string
  }

  const socialIcons: SocialIcon[] = [
    { name: 'LinkedIn', icon: 'fa6-brands:linkedin-in', url: 'https://www.linkedin.com/in/nicolo-pietro-belcastro/' },
    { name: 'GitHub', icon: 'fa6-brands:github', url: 'https://github.com/NickBeginner' }
  ]  
</script>