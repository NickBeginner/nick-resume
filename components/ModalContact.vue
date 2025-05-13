<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div 
      class="fixed inset-0 backdrop-blur-md transition-all duration-300"
      @click="closeModal"
    ></div>

    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button 
          @click="closeModal"
          class="sticky top-0 right-0 float-right p-4 text-gray-400 hover:text-gray-500 z-10"
        >
          <Icon name="heroicons:x-mark" class="h-6 w-6" />
        </button>
        
        <div class="p-6">
          <Contacts @close="closeModal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Contacts from '~/components/sections/Contacts.vue'

  const emit = defineEmits(['close'])

  const closeModal = () => {
    emit('close')
  }
</script>