<template>
  <main class="min-h-screen">
    <div class="flex flex-col md:flex-row h-screen">
      <!-- Burger menu button (visible on mobile only) -->
      <button
        class="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
        @click="sidebarOpen = true"
        aria-label="Open sidebar"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Sidebar: hidden on mobile, visible on desktop -->
      <div class="hidden md:block w-full md:w-64 shrink-0 h-auto md:h-full">
        <Sidebar 
          :active-section="currentSection" 
          @change-section="changeSection"
        />
      </div>

      <!-- Sidebar Drawer for mobile -->
      <Transition name="fade">
        <div
          v-if="sidebarOpen"
          class="fixed inset-0 z-40 flex"
        >
          <!-- Overlay -->
          <div class="fixed inset-0 backdrop-blur-md transition-all duration-50" @click="sidebarOpen = false"></div>
          <!-- Drawer -->
          <div class="relative w-64 bg-gray-800 text-white h-full z-50">
            <button
              class="absolute top-4 right-4 text-white"
              @click="sidebarOpen = false"
              aria-label="Close sidebar"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <Sidebar 
              :active-section="currentSection" 
              @change-section="changeSection"
            />
          </div>
        </div>
      </Transition>

      <div class="flex-1 bg-gray-50 overflow-y-auto">
        <div class="flex flex-col justify-start md:justify-center items-center md:items-start min-h-full pl-0 md:pl-8">
          <div class="w-full max-w-3xl py-8 md:py-12 text-left">
            <component 
              :is="currentComponent" 
              @open-skill="handleOpenSkill"
            />
          </div>
        </div>
      </div>

      <Transition
        enter-active-class="transition-opacity duration-75"
        leave-active-class="transition-opacity duration-75"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ModalSkill 
          v-if="showSkillModal" 
          :skill="selectedSkill" 
          @close="showSkillModal = false" 
        />
      </Transition>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useContentStore } from '~/stores/content'

  import Sidebar from '~/components/Sidebar.vue'
  import About from '~/components/sections/About.vue'
  import Experience from '~/components/sections/Experience.vue'
  import Education from '~/components/sections/Education.vue'
  import Skills from '~/components/sections/Skills.vue'
  import Contacts from '~/components/sections/Contacts.vue'
  import ModalSkill from '~/components/ModalSkill.vue'

  const sections = {
    about: About,
    experience: Experience,
    education: Education,
    skills: Skills,
    contacts: Contacts
  }

  const currentSection = ref('about')
  const showSkillModal = ref(false)
  const selectedSkill = ref(null)
  const currentComponent = computed(() => sections[currentSection.value])

  const contentStore = useContentStore()
  const sidebarOpen = ref(false)

  onMounted(() => {
    contentStore.loadContent('en')
  })

  const changeSection = (section) => {
    currentSection.value = section
    sidebarOpen.value = false
  }

  const handleOpenSkill = (skill) => {
    selectedSkill.value = skill
    showSkillModal.value = true
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>