<template>
  <section id="skills" class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">{{ contentStore.content.skills.title }}</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="(skill, index) in contentStore.content.skills.features" 
          :key="index" 
          class="bg-white p-6 rounded-lg shadow-md flex items-center justify-center text-center cursor-pointer hover:shadow-lg transition-shadow"
          @click="openSkillModal(skill)"
        >
          <span class="text-lg font-medium text-gray-800">{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useContentStore } from '~/stores/content'
import { defineEmits } from 'vue'

const emit = defineEmits(['open-skill'])
const contentStore = useContentStore()

const openSkillModal = (skill: { name: string; description: string }) => {
  emit('open-skill', skill)
}
</script>