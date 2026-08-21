export const useMenu = () => {

  const { user } = useAuth()

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      roles: ["user", "organizer", "admin"]
    },
    {
      name: "Actividades",
      path: "/events",
      roles: ["user", "organizer"]
    },
    {
      name: "Favoritos",
      path: "/favorites",
      roles: ["user"]
    },
    {
      name: "Mis inscripciones",
      path: "/my-registrations",
      roles: ["user"]
    },
    {
      name: "Usuarios",
      path: "/admin/users",
      roles: ["admin"]
    },
    {
      name: "Actividades",
      path: "/admin/events",
      roles: ["admin"]
    },
    {
      name: "Categorías",
      path: "/admin/categories",
      roles: ["admin"]
    }
  ]

  const visibleItems = computed(() => {

    if (!user.value) {
      return []
    }

    return menuItems.filter(item =>
      item.roles.includes(user.value.role)
    )

  })

  return {
    visibleItems
  }
}