<template>
  <section id="education" class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">{{ contentStore.content.education.title }}</h2>
      
      <div class="relative border-l-4 border-gray-300">
        <div 
          v-for="(title, index) in contentStore.content.education.titles" 
          :key="index" 
          class="mb-10 pl-8 relative"
        >
          <div class="absolute w-4 h-4 bg-gray-600 -left-2.5 top-0"></div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-gray-800">{{ title.degree }}</h3>
            <p class="text-gray-600">{{ title.institution }} · {{ title.date }}</p>
            <p class="mt-4 text-gray-700">{{ title.vote }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { useContentStore } from '~/stores/content'

  const contentStore = useContentStore()

</script>