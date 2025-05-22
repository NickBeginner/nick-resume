<template>
  <section id="contact" class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-6">{{ contentStore.content.contacts.title }}</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6 max-w-2xl mx-auto">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            {{ contentStore.content.contacts.name}}
          </label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            :disabled="loading"
          >
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            {{ contentStore.content.contacts.email }}
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            :disabled="loading"
          >
        </div>

        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
            {{ contentStore.content.contacts.subject }}
          </label>
          <input
            type="text"
            id="subject"
            v-model="form.subject"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            :disabled="loading"
          >
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
            {{ contentStore.content.contacts.message }}
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            :disabled="loading"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
          {{ loading ? 'Sending...' : contentStore.content.contacts.send }}
        </button>
      </form>

      <div v-if="submitSuccess === true" class="mt-6 p-4 bg-green-100 text-green-700 rounded-md max-w-2xl mx-auto">
        <p>{{ contentStore.content.contacts.success }}</p>
      </div>
      <div v-else-if="submitSuccess === false" class="mt-6 p-4 bg-red-100 text-red-700 rounded-md max-w-2xl mx-auto">
        <p>{{ contentStore.content.contacts.error }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContentStore } from '~/stores/content'

const contentStore = useContentStore()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitSuccess = ref<boolean|null>(null)
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  submitSuccess.value = null

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    submitSuccess.value = response.ok
    if (response.ok) {
      form.value = { name: '', email: '', subject: '', message: '' }
    }
  } catch (e) {
    submitSuccess.value = false
  }
  loading.value = false
}

</script>

<style scoped>
  input, textarea {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
</style>