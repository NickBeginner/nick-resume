export const useLanguage = () => {
  const currentLanguage = ref('en')
  
  const setLanguage = (lang: 'en' | 'it') => {
    currentLanguage.value = lang
  }

  return { currentLanguage, setLanguage }
}