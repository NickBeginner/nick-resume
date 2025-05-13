<template>
  <section id="experience" class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">{{ title }}</h2>
      
      <div class="relative border-l-4 border-gray-300">
        <div 
          v-for="(experience, index) in contentStore.content.experiences" 
          :key="index" 
          class="mb-10 pl-10 relative"
        >
          <div class="absolute w-4 h-4 bg-gray-600 -left-2.5 top-0"></div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-gray-800">{{ experience.title }}</h3>
            <p class="text-gray-600">{{ experience.company }} · {{ experience.date }}</p>
            <p v-for="(description, index) in experience.descriptions" :key="index" class="mt-4 text-gray-700 flex items-start">
              <span class="w-2 h-2 bg-gray-600 rounded-full mt-1 mr-3 shrink-0"></span>
              {{ description.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { useContentStore } from '~/stores/content'

  const contentStore = useContentStore()

  const title = computed(() => {
    const sidebarTitle = contentStore.content.sidebar.experience
    if (sidebarTitle === 'Experience') {
      return 'Work Experience'
    } else if (sidebarTitle === 'Esperienza') {
      return 'Esperienza Lavorativa'
    }
})
</script>