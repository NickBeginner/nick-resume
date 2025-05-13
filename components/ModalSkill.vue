<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div 
      class="fixed inset-0 backdrop-blur-md transition-all duration-50"
      @click="closeModal"
    ></div>

    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
        >
          <Icon name="heroicons:x-mark" class="h-6 w-6" />
        </button>
        
        <div class="p-6">
          <h3 class="text-2xl font-bold mb-4 text-gray-800">{{ skill.name }}</h3>
          <p class="text-gray-700">{{ skill.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    skill: {
      type: Object as () => { name: string; description: string },
      required: true
    }
  })

  const emit = defineEmits(['close'])

  const closeModal = () => {
    emit('close')
  }
</script>