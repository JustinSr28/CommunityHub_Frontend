export default defineNuxtPlugin(async () => {
  const { initAuth, refreshUser } = useAuth()

  initAuth()        
  await refreshUser()   
})