<template>
  <main class="min-h-screen">
    <div class="flex h-screen">
      <div class="w-64 shrink-0 h-full">
        <Sidebar 
          :active-section="currentSection" 
          @change-section="changeSection"
        />
      </div>
      
      <div class="flex-1 bg-gray-50 overflow-y-auto">
        <div class="min-h-full flex items-center pl-8">
          <div class="w-full max-w-3xl py-12 text-left">
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
  import ModalSkill from '~/components/ModalSkill.vue'

  const sections = {
    about: About,
    experience: Experience,
    education: Education,
    skills: Skills
  }

  const currentSection = ref('about')
  const showSkillModal = ref(false)
  const selectedSkill = ref(null)
  const currentComponent = computed(() => sections[currentSection.value])

  const contentStore = useContentStore()

  onMounted(() => {
    contentStore.loadContent('en')
  })

  const changeSection = (section) => {
    currentSection.value = section
  }

  const handleOpenSkill = (skill) => {
    selectedSkill.value = skill
    showSkillModal.value = true
  }
</script>