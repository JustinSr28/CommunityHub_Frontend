import {
  getAdminStats as getAdminStatsService,
  getOrganizerStats as getOrganizerStatsService,
  getUserStats as getUserStatsService
} from "~/services/dashboardServices"

export const useDashboard = () => {
  const adminStats = ref(null)
  const organizerStats = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const userStats = ref(null)

  const loadAdminStats = async () => {
    loading.value = true
    error.value = null
    try {
      adminStats.value = await getAdminStatsService()
    } catch (err) {
      error.value = "No se pudieron cargar las estadísticas."
    } finally {
      loading.value = false
    }
  }

  const loadOrganizerStats = async () => {
    loading.value = true
    error.value = null
    try {
      organizerStats.value = await getOrganizerStatsService()
    } catch (err) {
      error.value = "No se pudieron cargar las estadísticas."
    } finally {
      loading.value = false
    }
  }

  const loadUserStats = async () => {
  loading.value = true
  error.value = null
  try {
    userStats.value = await getUserStatsService()
  } catch (err) {
    error.value = "No se pudieron cargar tus datos."
  } finally {
    loading.value = false
  }
    }

  return {
    adminStats,
    organizerStats,
    loading,
    error,
    userStats,
    loadAdminStats,
    loadOrganizerStats,
    loadUserStats
  }
}