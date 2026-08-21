export const useAuth = () => {
  const user = useState("user", () => ({
    id: 1,
    displayName: "Sheyla Murillo",
    email: "sheyla@example.com",
    urlPhoto: "https://i.pravatar.cc/150?img=47",
    role: "user",
    status: "active"
  }))
  //const user = useState("user", () => null)

  const login = async (email, password) => {
  }
  const logout = async () => {
    await navigateTo("/")
  }
  const initAuth = async () => {
  }
  return {
    user,
    login,
    logout,
    initAuth
  }
}