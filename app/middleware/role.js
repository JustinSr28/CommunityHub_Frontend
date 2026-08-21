export default defineNuxtRouteMiddleware((to) => {

  const { user } = useAuth()

  const roles = to.meta.roles

  if (!roles) {
    return
  }

  if (!user.value) {
    return navigateTo("/")
  }

  if (!roles.includes(user.value.role)) {
    return navigateTo("/dashboard")
  }

})