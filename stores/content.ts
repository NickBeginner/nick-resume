import { defineStore } from 'pinia'
import { ref } from 'vue'

interface SidebarContent {
  about: string
  experience: string
  education: string
  skills: string
  contacts: string
}

interface LanguageContent {
  name: string
  level: string
}

interface AboutContent {
    title: string
    location: string
    bio: string
    languages: LanguageContent[]
}

interface ContactsContent {
  title: string,
  name: string,
  email: string,
  subject: string,
  message: string,
  send: string,
  success: string,
  error: string
}

interface ExperienceDescriptionContent {
  description: string
}

interface ExperienceContent {
  title: string,
  company: string,
  location: string,
  date: string,
  descriptions: ExperienceDescriptionContent[]
}

interface TitleContent {
  degree: string,
  institution: string,
  vote: string,
  date: string
}

interface EducationContent {
  title: string,
  titles: TitleContent[]
}

interface FeatureContent {
  name: string
  description: string
}

interface SkillsContent {
  title: string
  features: FeatureContent[]
}

interface Content {
  sidebar: SidebarContent
  about: AboutContent
  contacts: ContactsContent
  experiences: ExperienceContent[]
  education: EducationContent
  skills: SkillsContent
}

export const useContentStore = defineStore('content', () => {
  const content = ref<Content>({
    sidebar: {
      about: '',
      experience: '',
      education: '',
      skills: '',
      contacts: ''
    },
    about: {
      title: '',
      location: '',
      bio: '',
      languages: [
        {
          name: '',
          level: ''
        }
      ]
    },
    contacts: {
      title: '',
      name: '',
      email: '',
      subject: '',
      message: '',
      send: '',
      success: '',
      error: ''
    },
    experiences: [
      {
        title: '',
        company: '',
        location: '',
        date: '',
        descriptions: [
          {
            description: ''
          },
          {
            description: ''
          },
          {
            description: ''
          },
          {
            description: ''
          }
        ]
      }
    ],
    education: {
      title: '',
      titles: [
        {
          degree: '',
          institution: '',
          vote: '',
          date: ''
        }
      ]
    },
    skills: {
      title: '',
      features: [
        {
          name: '',
          description: ''
        }
      ]
    }
  })

  const loadContent = async (lang: string) => {
    try {
      const response = await $fetch<Content>(`content/${lang}.json`)
      content.value = response
      console.log('Content loaded in store:', content.value)
    } catch (error) {
      console.error('Error loading content:', error)
    }
  }

  return { content, loadContent }
})