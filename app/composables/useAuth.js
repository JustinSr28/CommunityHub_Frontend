import {
  login as loginService,
  register as registerService,
  logout as logoutService
} from "~/services/authServices"

export const useAuth = () => {

  const user = useState("user", () => null)
  const token = useState("token", () => null)

  const login = async (email, password) => {

    const response = await loginService({
      email,
      password
    })

    token.value = response.token
    user.value = response.user

    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(response.user))

    return response
  }


  const register = async (data) => {

    const response = await registerService(data)

    token.value = response.token
    user.value = response.user

    localStorage.setItem("token", response.token)
    localStorage.setItem("user", JSON.stringify(response.user))

    return response
  }


  const logout = async () => {

    try {
      await logoutService()
    } catch (error) {
      console.log("Error al cerrar sesión:", error)
    }

    token.value = null
    user.value = null

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    await navigateTo("/")
  }


  const initAuth = () => {

    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }


  return {
    user,
    token,
    login,
    register,
    logout,
    initAuth
  }
}